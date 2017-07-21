/* global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let libraryName = 'beanexplorer-react';
let outputFile;

if (env.min) {
    outputFile = libraryName + '.min.js';
}else{
    outputFile = libraryName + '.js';
}

let entry = '/src/index.js';
let outputPath = '/docs';
if (env.build) {
	outputPath = '/dist';
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
    'react': 'react',
		'react-dom': 'react-dom'
	},
	resolve: {
		modules: [path.resolve('./src'), "node_modules"],
		extensions: ['.json', '.js', '.jsx']
	},
	plugins: [
		new ExtractTextPlugin("styles.css"),
		//new BundleAnalyzerPlugin(),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/)
	]
};

if (!env.build) {
  config.plugins.push(new WebpackCleanupPlugin());
	config.plugins.push(new HtmlWebpackPlugin({
		template: './src/template.html',
		files: {
			js: ['bundle.js'],
		}
	}));
}

if (env.min) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
}

module.exports = config;
