#! /usr/bin/env node

export { getOverpackHooks } from './hooks';

import * as yargs from 'yargs';
import { Coordinator } from './Coordinator';

if (require.main === module) {
  const argv = yargs
    .scriptName('overpack')
    .alias('help', 'h')
    .option('config', {
      alias: 'c',
      default: 'webpack.config.js',
      description: 'Webpack config file to load',
    })
    .option('watch', {
      alias: 'w',
      default: false,
      description: 'Whether or not to start Webpack watcher',
    })
    .option('interactive', {
      alias: 'i',
      default: process.stdout.isTTY,
      description: 'Whether or not to run in interactive mode',
    })
    .option('env', {
      default: {},
      description: 'Environment to pass to Webpack',
    })
    .argv;

  const coordinator = new Coordinator(argv.config, argv.interactive, argv.watch, argv.env);
  coordinator.run().then(exitCode => process.exit(exitCode));

  process.on('SIGINT', () => process.exit(coordinator.stop()));
}
