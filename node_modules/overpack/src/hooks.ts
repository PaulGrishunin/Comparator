import { Compiler } from 'webpack';
import { SyncHook } from 'tapable';

const compilerHookMap = new WeakMap();

export function getOverpackHooks(compiler: Compiler) {
  if (!compilerHookMap.has(compiler)) {
    compilerHookMap.set(compiler, createCompilerHooks());
  }
  return compilerHookMap.get(compiler);
}

function createCompilerHooks() {
  return {
    createTask: new SyncHook([ 'taskId ' ]),
    startTask: new SyncHook([ 'taskId' ]),
    succeedTask: new SyncHook([ 'taskId' ]),
    failTask: new SyncHook([ 'taskId' ]),
    skipTask: new SyncHook([ 'taskId' ] ),
    error: new SyncHook([ 'message' ]),
    warning: new SyncHook([ 'message' ]),
  };
}
