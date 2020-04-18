'use strict';

const merge = require('webpack-merge');

const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const common = require('./webpack.common.js');
const { styleLoader } = require('./utils');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: './js/[name].[contentHash].bundle.js'
  },
  module: {
    rules: styleLoader('sass', false)
  },
  devtool: 'nosources-source-map',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
});
