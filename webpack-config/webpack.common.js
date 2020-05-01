'use strict';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyPlugin = require('copy-webpack-plugin');

const utils = require('./utils');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  externals: {
    paths: utils.PATHS
  },
  entry: {
    main: ['./src/js/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
        // options: {
        //   fix: true,
        //   emitError: true,
        //   formatter: require('eslint-friendly-formatter')
        // }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: ['img:src']
          // pretty: true
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000000
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: (path) => {
            const arr = path.split('\\');
            const index = arr.indexOf('fonts');
            const _path = arr.slice(index, arr.length - 1).join('/');

            return `../${_path}/[name].[ext]`
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...utils.pageFile(),
    new MiniCssExtractPlugin({
      filename: devMode ? './style/[name].css' : './style/[name].[contenthash].css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyPlugin([
      { from: './src/assets/images', to: 'images' },
      { from: './src/assets/fonts', to: 'fonts' }
    ]),
    new WebpackMd5Hash()
  ]
};
