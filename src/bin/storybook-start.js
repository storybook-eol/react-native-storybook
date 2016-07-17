#!/usr/bin/env node

import program from 'commander';
import WebApp from '../webapp';
import { getDefaultConfig } from '../config.js';

program
  .option('-h, --host <host>', 'host to listen on')
  .option('-p, --port <port>', 'port to listen on')
  .option('-c, --config <config>', 'configurations (json)')
  .parse(process.argv);

const config = getDefaultConfig();

if (program.host || program.port) {
  program.host = program.host || 'localhost';
  program.port = program.port || 9001;
  Object.assign(config, {
    channel: {
      type: 'websocket',
      options: {
        url: `ws://${program.host}:${program.port}`,
      }
    },
    webapp: {
      host: program.host,
      port: program.port,
    },
  });
}

if (program.config) {
  const customConfig = JSON.parse(program.config);
  Object.assign(config, customConfig);
}

const webapp = new WebApp(config);
webapp.listen()
  .then(() => console.info(`listening on http://${config.webapp.host}:${config.webapp.port}`))
  .catch(e => console.error(e));
