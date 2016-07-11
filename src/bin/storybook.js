#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import program from 'commander';

import startServer from '../server';
import getIndexHTML from '../server/pages/index.html.js';

//  ------------------------------------------------------------------------  //

program
  .version(require('../../package.json').version);

program
  .command('start [platform]')
  .option('-h, --host <host>', 'host to listen on')
  .option('-p, --port <port>', 'port to listen on', parseInt)
  .option('-c, --config <config>', 'config JSON')
  .description('starts react native storybook')
  .action(function(platform, env) {
    const config = env.config ? JSON.parse(env.config) : {};
    // listen on localhost if a host name is not given
    startServer(env.port, env.host || 'localhost', config);
  });

program
  .command('build')
  .option('-c, --config <config>', 'config JSON')
  .option('-o, --outdir <outdir>', 'location to write results to')
  .description('starts react native storybook on android simulator')
  .action(function(env) {
    const outdir = path.resolve(process.cwd(), env.outdir);
    const prjdir = path.resolve(process.cwd(), 'android');
    const config = env.config ? JSON.parse(env.config) : {};
    shell.exec(`mkdir -p ${outdir}`);
    // build the storybook webapp
    shell.exec(`cp -r ${path.resolve(__dirname, '../server/public/*')} ${outdir}`);
    fs.writeFileSync(path.join(outdir, 'index.html'), getIndexHTML(config));
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
