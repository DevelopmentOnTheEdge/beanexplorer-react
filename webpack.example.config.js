/* global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry: __dirname + '/src/index.js',
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
    new ExtractTextPlugin({
      filename: 'index.[hash].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/example.html'),
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
