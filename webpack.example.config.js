/* global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
	entry: __dirname + '/src/example.js',
	output: {
		path: __dirname + '/docs',
    filename: 'example.[hash].js'
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, '../src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
	plugins: [
    new WebpackCleanupPlugin(),
    new ExtractTextPlugin({
      filename: 'index.[hash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/template.html'),
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
	]
};
