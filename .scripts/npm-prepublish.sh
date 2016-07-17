#!/bin/bash

rm -rf ./dist
./node_modules/.bin/babel --ignore manager,__tests__ ./src --out-dir ./dist
./node_modules/.bin/webpack --config ./.scripts/webpack.manager.conf.js
cp -r ./src/webapp/public/* ./dist/webapp/public
