import * as NodeIPC from 'node-ipc';
import * as webpack from 'webpack';
import { Compiler, Stats } from 'webpack';
import JestWorker from 'jest-worker';
import { MessageEmitter } from './MessageEmitter';
import { getOverpackHooks } from './hooks';
import { loadConfig } from './Configuration';

export const WEBPACK_PLUGIN_NAME = 'overpack';

export type WebpackWorkerRunFn = (opts: WebpackWorkerOptions) => Promise<void>;

export interface WebpackWorkerOptions {
  ipcChannel: string;
  configPath: string;
  configIndex: number;
  watch: boolean;
  env: {};
}

export interface WebpackWorker extends JestWorker {
  run?: WebpackWorkerRunFn;
}

export const run: WebpackWorkerRunFn = (opts: WebpackWorkerOptions) => new Promise(resolve => {
  const config = loadConfig(opts.configPath, opts.env)[opts.configIndex];
  const compiler = webpack(config);

  const ipc = new NodeIPC.IPC();
  ipc.config.silent = true;
  ipc.connectTo(opts.ipcChannel);

  const workerId = config.name || `Configuration ${opts.configIndex}`;

  const emit = ipc.of[opts.ipcChannel].emit.bind(ipc.of[opts.ipcChannel]);
  const messageEmitter = new MessageEmitter(workerId, emit);

  tapCompilerHooks(workerId, compiler, messageEmitter);
  tapOverpackTaskHooks(compiler, messageEmitter);

  if (opts.watch) {
    compiler.watch({}, () => {});
  } else {
    compiler.run(() => resolve());
  }
});

export function tapCompilerHooks(rootTaskId: string, compiler: Compiler, messageEmitter: MessageEmitter) {
  const COMPILE_TASK_ID = 'Compile';
  const EMIT_TASK_ID = 'Emit';

  compiler.hooks.compile.tap(WEBPACK_PLUGIN_NAME, () => {
    messageEmitter.triggerBuild();
    messageEmitter.createTask(COMPILE_TASK_ID);
    messageEmitter.createTask(EMIT_TASK_ID);

    messageEmitter.startTask(COMPILE_TASK_ID);
  });

  compiler.hooks.afterCompile.tap(WEBPACK_PLUGIN_NAME, (compilation) => {
    if (compilation.errors && compilation.errors.length > 0) {
      messageEmitter.failTask(COMPILE_TASK_ID);
      messageEmitter.skipTask(EMIT_TASK_ID);
    } else {
      messageEmitter.succeedTask(COMPILE_TASK_ID);
    }
  });

  compiler.hooks.emit.tap(WEBPACK_PLUGIN_NAME, () => messageEmitter.startTask(EMIT_TASK_ID));

  compiler.hooks.afterEmit.tap(WEBPACK_PLUGIN_NAME, (compilation) => {
    if (compilation.errors && compilation.errors.length > 0) {
      messageEmitter.failTask(EMIT_TASK_ID);
    } else {
      messageEmitter.succeedTask(EMIT_TASK_ID);
    }
  });

  compiler.hooks.failed.tap(WEBPACK_PLUGIN_NAME, (error: Error) => {
    if (error) {
      messageEmitter.error(error.stack);
    }
  });

  compiler.hooks.done.tap(WEBPACK_PLUGIN_NAME, (stats: Stats) => {
    const info = stats.toJson();

    if (stats.hasWarnings()) {
      info.warnings.forEach((warning: string) => messageEmitter.warning(warning));
    }

    if (stats.hasErrors()) {
      info.errors.forEach((error: string) => messageEmitter.error(error));
    }
  });
}

export function tapOverpackTaskHooks(compiler: Compiler, messageEmitter: MessageEmitter) {
  const hooks = getOverpackHooks(compiler);
  hooks.error.tap(WEBPACK_PLUGIN_NAME, (msg: string) => messageEmitter.error(msg));
  hooks.warning.tap(WEBPACK_PLUGIN_NAME, (msg: string) => messageEmitter.warning(msg));
  hooks.createTask.tap(WEBPACK_PLUGIN_NAME, (taskId: string) => messageEmitter.createTask(taskId));
  hooks.startTask.tap(WEBPACK_PLUGIN_NAME, (taskId: string) => messageEmitter.startTask(taskId));
  hooks.succeedTask.tap(WEBPACK_PLUGIN_NAME, (taskId: string) => messageEmitter.succeedTask(taskId));
  hooks.failTask.tap(WEBPACK_PLUGIN_NAME, (taskId: string) => messageEmitter.failTask(taskId));
}
