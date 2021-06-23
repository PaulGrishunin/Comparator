import { performance } from 'perf_hooks';

export enum Status {
  NotStarted = 'NotStarted',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  Skipped = 'Skipped',
}

export class Task {
  private readonly _id: string;
  private _startTime: number = undefined;
  private _finishTime: number = undefined;
  private _status: Status = Status.NotStarted;

  get id(): string {
    return this._id;
  }

  get startTime(): number {
    return this._startTime;
  }

  get finishTime(): number {
    return this._finishTime;
  }

  get status(): Status {
    return this._status;
  }

  constructor(id: string) {
    this._id = id;
  }

  start() {
    this._status = Status.Running;
    this._startTime = performance.now();
  }

  succeed() {
    this._status = Status.Succeeded;
    this._finishTime = performance.now();
  }

  fail() {
    this._status = Status.Failed;
    this._finishTime = performance.now();
  }

  skip() {
    this._status = Status.Skipped;
    this._startTime = undefined;
    this._finishTime = undefined;
  }

  isFinished(): boolean {
    return this._status === Status.Succeeded || this._status === Status.Failed || this._status === Status.Skipped;
  }
}
