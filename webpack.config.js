var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: './src/index',
  output: {
      path: path.join(__dirname, 'dist'),
      filename: "val.js",
      library: 'val',
      libraryTarget: 'umd',
      umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel-loader' ],
        exclude: /node_modules/
      }
    ]
  }
};
