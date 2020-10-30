/* global __dirname, require, module*/
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    mode: "production",
    entry: ["babel-polyfill", __dirname + '/src/example.js'],
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
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/template.html'),
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),
    ]
};
