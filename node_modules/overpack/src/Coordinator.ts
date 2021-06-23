import * as NodeIPC from 'node-ipc';
import * as logUpdate from 'log-update';
import * as os from 'os';
import * as shortid from 'shortid';
import { Action, ErrorMessage, Message, TaskMessage, WarningMessage } from './MessageEmitter';
import { WebpackWorker, WebpackWorkerOptions } from './WebpackWorker';
import { Build } from './Build';
import JestWorker from 'jest-worker';
import { Task } from './Task';
import chalk from 'chalk';
import { loadConfig } from './Configuration';
import { renderBuild } from './InteractiveRenderer';

export class Coordinator {
  private readonly configPath: string;
  private readonly interactive: boolean;
  private readonly watch: boolean;
  private readonly env: {};
  private readonly runningBuilds = new Map<string, Build>();
  private readonly ipc = new NodeIPC.IPC();

  private intervalId: NodeJS.Timeout;

  constructor(configPath: string, interactive: boolean, watch: boolean, env: {}) {
    this.configPath = configPath;
    this.interactive = interactive;
    this.watch = watch;
    this.env = env;
    this.ipc.config.silent = true;
    this.ipc.config.id = `overpack-${shortid.generate()}`;
  }

  async run(): Promise<number> {
    this.registerRender();

    this.ipc.serve();
    this.initIpcServer();
    this.ipc.server.start();

    const webpackConfigs = loadConfig(this.configPath, this.env);

    const cpuCount = os.cpus().length;
    const numWorkers = Math.min(cpuCount, webpackConfigs.length);
    const pool: WebpackWorker = new JestWorker(require.resolve('./WebpackWorker'), {
      numWorkers,
      forkOptions: {
        silent: true,
      },
    });

    const runningWorkers = webpackConfigs.map((config, index) => {
      const webpackWorkerOptions: WebpackWorkerOptions = {
        ipcChannel: this.ipc.config.id,
        configPath: this.configPath,
        configIndex: index,
        watch: this.watch,
        env: this.env,
      };
      return pool.run(webpackWorkerOptions);
    });

    try {
      await Promise.all(runningWorkers);
    } catch(err){
      console.error(err);
    }

    const code = this.stop();
    return Promise.resolve(code);
  }

  private initIpcServer() {
    const server = this.ipc.server;

    server.on(Action.TriggerBuild, (msg: Message) => {
      this.runningBuilds.set(msg.workerId, new Build(msg.workerId));
    });

    server.on(Action.Error, (msg: ErrorMessage) => {
      const build = this.runningBuilds.get(msg.workerId);
      build && build.error(msg.error);
    });

    server.on(Action.Warning, (msg: WarningMessage) => {
      const build = this.runningBuilds.get(msg.workerId);
      build && build.warning(msg.warning);
    });

    server.on(Action.CreateTask, (msg: TaskMessage) => {
      const build = this.runningBuilds.get(msg.workerId);
      build && build.tasks.set(msg.taskId, new Task(msg.taskId));
    });

    server.on(Action.StartTask, (msg: TaskMessage) => {
      const task = this.findTask(msg.workerId, msg.taskId);
      task && task.start();
    });

    server.on(Action.SucceedTask, (msg: TaskMessage) => {
      const task = this.findTask(msg.workerId, msg.taskId);
      task && task.succeed();
      this.handleFinishedBuilds();
    });

    server.on(Action.FailTask, (msg: TaskMessage) => {
      const task = this.findTask(msg.workerId, msg.taskId);
      task && task.fail();
      this.handleFinishedBuilds();
    });

    server.on(Action.SkipTask, (msg: TaskMessage) => {
      const task = this.findTask(msg.workerId, msg.taskId);
      task && task.skip();
      this.handleFinishedBuilds();
    });
  }

  registerRender() {
    this.intervalId = setInterval(() => {
      const outputs = [];
      for (const build of this.runningBuilds.values()) {
        outputs.push(renderBuild(build));
      }
      if (outputs.length > 0) {
        logUpdate(outputs.join('\n\n'));
      } else {
        logUpdate.clear();
      }
    }, 50);
  }

  handleFinishedBuilds() {
    let stopped = false;
    for (const build of this.runningBuilds.values()) {
      if (build.isFinished()) {
        if (!stopped) {
          this.intervalId && clearInterval(this.intervalId);
          this.intervalId = undefined;
          stopped = true;
          logUpdate.clear();
          logUpdate.done();
        }

        const errorCount = build.errors.length.toString();
        const warningCount = build.warnings.length.toString();

        console.log(renderBuild(build));
        console.log(`Finished ${build.workerId} with ${errorCount} errors and ${warningCount} warnings`);
        build.errors.forEach(error => console.log(chalk.red(error)));
        build.warnings.forEach(warning => console.log(chalk.yellow(warning)));
        console.log();

        this.runningBuilds.delete(build.workerId);
      }
    }

    if (!this.intervalId) {
      this.registerRender();
    }
  }

  findTask(workerId: string, taskId: string): Task {
    const build = this.runningBuilds.get(workerId);
    if (build) {
      return build.tasks.get(taskId);
    }
    return null;
  }

  stop(): number {
    this.ipc.server.stop();

    for (const build of this.runningBuilds.values()) {
      if (build.failed()) {
        return 1;
      }
    }

    return 0;
  }
}
