#!/bin/bash

rm -rf ./dist

mkdir -p dist/{client,server}

./node_modules/.bin/babel --ignore __tests__ ./src/bin --out-dir ./dist/bin
./node_modules/.bin/babel --ignore __tests__,manager ./src/client --out-dir ./dist/client
./node_modules/.bin/babel --ignore __tests__ ./src/server --out-dir ./dist/server
./node_modules/.bin/webpack --config ./.scripts/webpack.manager.conf.js
