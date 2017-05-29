/* global __dirname, require, module*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
let HtmlWebpackPlugin = require('html-webpack-plugin');

let libraryName = 'beanexplorer-react';
let outputFile = libraryName + '.min.js';;

module.exports = {
	entry: __dirname + '/src/index.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/docs',
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				},
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}
		]
	},
	resolve: {
		modules: [path.resolve('./src'), "node_modules"],
		extensions: ['.json', '.js', '.jsx']
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: './src/example.html',
      files: {
        js: ['bundle.js'],
      }
    })
    //,new UglifyJsPlugin({ minimize: true })
	]
};
