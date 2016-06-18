#!/usr/bin/env node

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
  .parse(process.argv);
