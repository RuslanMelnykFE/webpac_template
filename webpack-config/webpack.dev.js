'use strict';

const webpack = require('webpack');
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
  plugins: [
    new webpack.HotModuleReplacementPlugin({})
  ],
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    hot: true,
    inline: true,
    port: 9090
  }
});
