import express, { Router } from 'express';
import path from 'path';
import process from 'process';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import baseConfig from './config/webpack.config';
import loadConfig from './config';
import getIndexHtml from './index.html';

export default function (configDir) {
  // Build the webpack configuration using the `baseConfig`
  // custom `.babelrc` file and `webpack.config.js` files
  const config = loadConfig('DEVELOPMENT', baseConfig, configDir);

  // remove the leading '/'
  let publicPath = config.output.publicPath;
  if (publicPath[0] === '/') {
    publicPath = publicPath.slice(1);
  }

  const compiler = webpack(config);
  const devMiddlewareOptions = {
    noInfo: true,
    publicPath: config.output.publicPath,
    watchOptions: config.watchOptions || {},
  };

  const router = new Router();
  router.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
  router.use(webpackHotMiddleware(compiler));

  function resolvePath(str) {
    if (str.substr(0, 2) === '~/') {
      str = (process.env.HOME || process.env.HOMEPATH || process.env.HOMEDIR || process.cwd()) + str.substr(1);
    }
    return path.resolve(str);
  }

  router.use('/screenshot', express.static(resolvePath('~/Library/Developer/CoreSimulator/Devices')))

  router.get('/', function (req, res) {
    res.send(getIndexHtml(publicPath));
  });

  return router;
}
