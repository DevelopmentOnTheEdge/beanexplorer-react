/* global __dirname, require, module*/
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
let HtmlWebpackPlugin = require('html-webpack-plugin');

let libraryName = 'beanexplorer-react';
let outputFile = libraryName + '.min.js';

let entry = '/src/index.js';
let outputPath = '/docs';
if (env === 'build') {
	outputPath = '/build';
	entry = '/src/components/PropertySet.js';
}

let config = {
	entry: __dirname + entry,
	devtool: 'source-map',
	output: {
		path: __dirname + outputPath,
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
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},
	resolve: {
		modules: [path.resolve('./src'), "node_modules"],
		extensions: ['.json', '.js', '.jsx']
	},
	plugins: [
		new UglifyJsPlugin({ minimize: true }),
	  new ExtractTextPlugin("styles.css")
	]
};

if (env !== 'build') {
	config.plugins.push(new HtmlWebpackPlugin({
		template: './src/build.html',
		files: {
			js: ['bundle.js'],
		}
	}));
}

module.exports = config;
