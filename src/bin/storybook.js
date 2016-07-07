#!/usr/bin/env node

import shell from 'shelljs';
import program from 'commander';
import startServer from '../server';

//  ------------------------------------------------------------------------  //

program
  .version(require('../../package.json').version);

program
  .command('start [platform]')
  .option('-h, --host <host>', 'host to listen on')
  .option('-p, --port <port>', 'port to listen on', parseInt)
  .description('starts react native storybook')
  .action(function(platform, env) {
    // listen on localhost if a host name is not given
    startServer(env.port, env.host || 'localhost', {});
  });

program
  .command('run-ios')
  .option('-a, --appname <appname>', 'storybook application name eg. "MyAppStorybook"')
  .option('-i, --identifier <identifier>', 'storybook application identifier eg. "org.mycompany.MyAppStorybook"')
  .description('starts react native storybook ios simulator')
  .action(function(env) {
    shell.exec(`react-native run-ios --scheme=${env.appname}`);
    shell.exec(`xcrun simctl install booted ios/build/Build/Products/Debug-iphonesimulator/${env.appname}.app`);
    shell.exec(`xcrun simctl launch booted ${env.identifier}`);
  });

program
  .command('run-android')
  .option('-i, --identifier <identifier>', 'storybook application id eg. "com.myapplication.storybook"')
  .description('starts react native storybook on android simulator')
  .action(function(env) {
    shell.exec(`react-native run-android --variant=storybook`);
    shell.exec(`adb shell monkey -p ${env.identifier} 1`);
  });

program
  .parse(process.argv);
