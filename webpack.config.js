
const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';
const LIB_DIR = path.resolve(__dirname);
const BIN_DIR = path.resolve(__dirname, 'web/bin');
const TOOL_PROD = 'cheap-module-source-map';


const config = {

  entry: ['babel-regenerator-runtime', LIB_DIR + '/index.web.js'],

  output: {
    path: BIN_DIR,
    filename: 'app.js'
  },

  module : {
    loaders : [
      {
        include : [LIB_DIR],
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },

  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
  ]
};

// conditional properties
if ('development' != NODE_ENV) {
  config.devtool = TOOL_PROD;
  config.plugins.push(new webpack.DefinePlugin({
    compress: { warnings: false }
  }));
}

module.exports = config;
