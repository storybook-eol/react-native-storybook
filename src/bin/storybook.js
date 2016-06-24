#!/usr/bin/env node

import shell from 'shelljs';
import program from 'commander';
import server from '../server';

// avoid eslint errors
const logger = console;

//  ------------------------------------------------------------------------  //

program
  .version(require('../../package.json').version);

program
  .command('start [platform]')
  .option('-h, --host <host>', 'host to listen on')
  .option('-p, --port <port>', 'port to listen on', parseInt)
  .description('starts react native storybook')
  .action(function(platform, env) {
    server.listen(env.port, env.host, function (err) {
      if (err) throw err;
      const address = `http://${env.host || 'localhost'}:${env.port}/`;
      logger.info(`\nStorybook server started on => ${address}\n`);
    })
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
  .parse(process.argv);
