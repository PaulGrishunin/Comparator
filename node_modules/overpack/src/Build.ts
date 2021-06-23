import { Status, Task } from './Task';

export class Build {
  private readonly _workerId: string;
  private readonly _warnings: string[] = [];
  private readonly _errors: string[] = [];

  public readonly tasks = new Map<string, Task>();

  constructor(workerId: string) {
    this._workerId = workerId;
  }

  get workerId(): string {
    return this._workerId;
  }

  get errors(): string[] {
    return this._errors;
  }

  get warnings(): string[] {
    return this._warnings;
  }

  error(msg: string): void {
    this._errors.push(msg);
  }

  warning(msg: string): void {
    this._warnings.push(msg);
  }

  createTask(id: string) {
    this.tasks.set(id, new Task(id));
  }

  failed(): boolean {
    for (const task of this.tasks.values()) {
      if (task.status === Status.Failed) {
        return true;
      }
    }
    return false;
  }

  isFinished(): boolean {
    for (const task of this.tasks.values()) {
      if (!task.isFinished()) {
        return false;
      }
    }
    return true;
  }
}
