#!/usr/bin/env node

import program from 'commander';

program
  .version(require('../../package.json').version)
  .command('start', 'starts storybook webapp', {isDefault: true})
  .command('build', 'builds storybook webapp')
  .command('run-ios', 'run storybook in ios simulator')
  .command('run-android', 'run storybook in android emulator')
  .parse(process.argv);
