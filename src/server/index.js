#!/usr/bin/env node

import http from 'http';
import express from 'express';
import program from 'commander';
import path from 'path';
import fs from 'fs';
import SocketIO from 'socket.io';
import storybook from './middleware';
import packageJson from '../../package.json';

// avoid eslint errors
const logger = console;

program
  .version(packageJson.version)
  .option('-p, --port [number]', 'Port to run Storybook (Required)', parseInt)
  .option('-h, --host [string]', 'Host to run Storybook')
  .parse(process.argv);

if (!program.port) {
  logger.error('Error: port to run Storybook is required!\n');
  program.help();
  process.exit(-1);
}

// Used with `app.listen` below
const listenAddr = [program.port];

if (program.host) {
  listenAddr.push(program.host);
}

const app = express();
app.use(storybook());

const server = http.Server(app);
const io = SocketIO(server);

io.on('connection', function (socket) {
  socket.on('init', function (msg) {
    const clientType = msg.type;
    socket.join(clientType);

    // device ==> browser
    if (clientType === 'device') {
      ['setStories', 'addAction', 'selectStory', 'applyShortcut'].forEach(type => {
        socket.on(type, m => io.sockets.in('browser').emit(type, m));
      });
    }

    // browser ==> device
    if (clientType === 'browser') {
      ['getStories', 'selectStory'].forEach(type => {
        socket.on(type, m => io.sockets.in('device').emit(type, m));
      });
    }
  });
});

server.listen(...listenAddr, function (error) {
  if (error) {
    throw error;
  } else {
    const address = `http://${program.host || 'localhost'}:${program.port}/`;
    logger.info(`\nReact Storybook started on => ${address}\n`);
  }
});
