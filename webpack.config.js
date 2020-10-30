"use strict";
const webpack = require('webpack');
const path = require('path');
const rules = require('./webpack.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8887";

rules.push({
  test: /\.scss$/,
  use: ['style-loader',{loader: 'css-loader', options: {importLoaders: '1'}},'sass-loader'],
  exclude: /node_modules/
});

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './src/dev.js'
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules
  },
  devServer: {
    contentBase: "./public",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'style.css'}),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
