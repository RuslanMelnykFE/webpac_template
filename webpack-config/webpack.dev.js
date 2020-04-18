'use strict';

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const { styleLoader } = require('./utils.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: styleLoader('sass', true)
  },
  devtool: 'inline-sourse-map',
  // wath: true,
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    port: 9090
  }
});
