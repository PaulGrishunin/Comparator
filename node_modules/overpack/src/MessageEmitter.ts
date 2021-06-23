export enum Action {
  TriggerBuild = 'TriggerBuild',
  Error = 'Error',
  Warning = 'Warning',
  CreateTask = 'CreateTask',
  StartTask = 'StartTask',
  SucceedTask = 'SucceedTask',
  FailTask = 'FailTask',
  SkipTask = 'SkipTask',
}

export interface Message {
  workerId: string;
}

export interface TaskMessage extends Message {
  taskId: string;
}

export interface ErrorMessage extends Message {
  error: string;
}

export interface WarningMessage extends Message {
  warning: string;
}

export type MessageEmitFn = (type: Action, data: any) => void;

export class MessageEmitter {
  private readonly workerId: string;
  private readonly emit: MessageEmitFn;

  constructor(workerId: string, emit: MessageEmitFn) {
    this.workerId = workerId;
    this.emit = emit;
  }

  triggerBuild(): void {
    this.emit(Action.TriggerBuild, { workerId: this.workerId });
  }

  error(error: string): void {
    this.emit(Action.Error, { workerId: this.workerId, error });
  }

  warning(warning: string): void {
    this.emit(Action.Warning, { workerId: this.workerId, warning });
  }

  createTask(taskId: string): void {
    this.emit(Action.CreateTask, { workerId: this.workerId, taskId });
  }

  startTask(taskId: string): void {
    this.emit(Action.StartTask, { workerId: this.workerId, taskId });
  }

  succeedTask(taskId: string): void {
    this.emit(Action.SucceedTask, { workerId: this.workerId, taskId });
  }

  failTask(taskId: string): void {
    this.emit(Action.FailTask, { workerId: this.workerId, taskId });
  }

  skipTask(taskId: string): void {
    this.emit(Action.SkipTask, { workerId: this.workerId, taskId });
  }
}
