#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import program from 'commander';
import shell from 'shelljs';
import getHTML from '../webapp/pages/index.html.js';
import { getDefaultConfig } from '../config.js';

program
  .option('-c, --config <config>', 'config JSON')
  .option('-o, --outdir <outdir>', 'location to write results to')
  .option('-i, --ios <ios>', 'build storybook for ios')
  .option('-a, --android <android>', 'build storybook for android')
  .parse(process.argv);

if (!program.outdir) {
  program.outdir = './storybook-build';
}

const config = getDefaultConfig();

if (program.config) {
  const customConfig = JSON.parse(program.config);
  Object.assign(config, customConfig);
}

shell.exec(`rm -rf ${program.outdir}`);
shell.exec(`mkdir -p ${program.outdir}`);

const pubdir = path.resolve(__dirname, '../webapp/public/*');
shell.exec(`cp -r ${pubdir} ${program.outdir}`);

const indexFile = path.join(program.outdir, 'index.html');
fs.writeFileSync(indexFile, getHTML(config));

if (program.ios) {
  // TODO build storybook for ios
}

if (program.android) {
  // TODO build storybook for android
}
