var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: null,
  entry: path.resolve(__dirname, '../src/client/manager/index.js'),
  output: { path: path.resolve(__dirname, '../dist/server/public'), filename: 'manager.js' },
  plugins: [],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, '../node_modules/'),
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
};
