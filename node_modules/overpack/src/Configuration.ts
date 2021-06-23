import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';

export interface Configuration extends WebpackConfiguration {
  name?: string;
}

export function loadConfig(configPath: string, env: {}): Configuration[] {
  const configModule = require(path.resolve(configPath));
  const configs = (typeof configModule === 'function') ? configModule(env) : configModule;

  return Array.isArray(configs) ? configs : [ configs ];
}
