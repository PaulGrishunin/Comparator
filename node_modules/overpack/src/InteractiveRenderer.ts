import { Status, Task } from './Task';
import { Build } from './Build';
import chalk from 'chalk';
import { performance } from 'perf_hooks';

interface Graphic {
  style: (input: string) => string;
  frames: string[];
  interval?: number;
}

const StatusGraphics: { [TKey in Status]: Graphic} = {
  NotStarted: {
    style: chalk.bold.gray,
    frames: [ '›' ],
  },
  Running: {
    style: chalk.bold.blueBright,
    frames: [ '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏' ],
    interval: 50,
  },
  Succeeded: {
    style: chalk.bold.green,
    frames: [ '✔' ],
  },
  Failed: {
    style: chalk.bold.red,
    frames: [ '✖' ],
  },
  Skipped: {
    style: chalk.bold.yellow,
    frames: [ '⎋' ],
  },
};

export function renderBuild(build: Build): string {
  const renderedTasks: string[] = [];
  for (const task of build.tasks.values()) {
    renderedTasks.push(renderTask(task));
  }
  return `${chalk.bold.white(build.workerId)}\n${renderedTasks.join('\n')}`;
}

function renderTask(task: Task): string {
  const graphic = StatusGraphics[task.status];
  const curFrame = graphic.interval
    ? Math.floor((performance.now() - task.startTime) / graphic.interval) % graphic.frames.length
    : 0;
  return `  ${graphic.style(graphic.frames[curFrame])} ${task.id}`;
}
