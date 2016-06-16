'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // remove the leading '/'
  var publicPath = _webpack4.default.output.publicPath;
  if (publicPath[0] === '/') {
    publicPath = publicPath.slice(1);
  }

  var compiler = (0, _webpack2.default)(_webpack4.default);
  var devMiddlewareOptions = {
    noInfo: true,
    publicPath: _webpack4.default.output.publicPath
  };

  var router = new _express.Router();
  router.use((0, _webpackDevMiddleware2.default)(compiler, devMiddlewareOptions));
  router.use((0, _webpackHotMiddleware2.default)(compiler));

  router.get('/', function (req, res) {
    res.send((0, _index2.default)(publicPath));
  });

  return router;
};

var _express = require('express');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = require('./webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _index = require('./index.html');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }