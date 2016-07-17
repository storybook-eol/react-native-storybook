#!/usr/bin/env node

import program from 'commander';
import shell from 'shelljs';

program
  .option('-a, --appname <appname>', 'storybook application name eg. "MyAppStorybook"')
  .option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"')
  .parse(process.argv);

shell.exec(`react-native run-ios --scheme=${program.appname}`);
shell.exec(`xcrun simctl install booted ios/build/Build/Products/Debug-iphonesimulator/${program.appname}.app`);
shell.exec(`xcrun simctl launch booted ${program.identifier}`);
