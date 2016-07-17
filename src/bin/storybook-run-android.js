#!/usr/bin/env node

import program from 'commander';
import shell from 'shelljs';

program
  .option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"')
  .parse(process.argv);

shell.exec(`react-native run-android --variant=storybook`);
shell.exec(`adb shell monkey -p ${program.identifier} 1`);
