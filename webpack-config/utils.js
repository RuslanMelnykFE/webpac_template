'use strict';

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: path.join(__dirname, '../src/assets')
};

// ========== Создание лоадеров для стилей ==========
const styleLoader = function (loader, isDev, optionLoader = {}) {
  const styleLoader = 'style-loader';
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: isDev,
      importLoaders: 2
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins () {
        return [
          require('autoprefixer'),
          require('cssnano')
        ];
      }
    }
  };

  const miniCss = {
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev
    }
  };


  const use = [styleLoader, miniCss, cssLoader, postcssLoader];

  use.push({
    loader: `${loader}-loader`,
    options: Object.assign({}, optionLoader, {
      sourceMap: isDev
    })
  });

  return [{ test: /\.(sa|sc|c)ss$/, use }];
};

// ========== Обработка файлов Pug ==========
const pageFile = function () {
  const PAGES_DIR = `${PATHS.src}/views/pages`;
  const PAGES = fs.readdirSync(PAGES_DIR).filter((fileItem) => fileItem.endsWith('.pug'));

  return PAGES.map((page) => (new HtmlWebpackPlugin({
    template: `${PAGES_DIR}/${page}`,
    filename: `./${page.replace(/\.pug/, '.html')}`
  })
  ));
};

module.exports = { PATHS, styleLoader, pageFile };
