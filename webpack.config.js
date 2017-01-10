var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: {
    val: [
      './src/index'
    ],
    example: './src/example',
  },
  output: {
      path: path.join(__dirname, 'dist'),
      filename: "[name].js",
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
