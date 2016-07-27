var path = require('path');
var webpack = require('webpack');

const plugins = [
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
  }),
];

module.exports = {
  devtool: null,
  entry: path.resolve(__dirname, '../src/manager/index.js'),
  output: { path: path.resolve(__dirname, '../dist/webapp/public'), filename: 'manager.js' },
  plugins: plugins,
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
