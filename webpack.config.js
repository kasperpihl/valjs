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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [ {
          loader: 'babel-loader',
          query: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }]
            ],
            "plugins": [
              "babel-plugin-transform-object-entries",
              "transform-object-rest-spread"
            ]
          }
        }],
        exclude: /node_modules/
      }
    ]
  }
};
