"use strict";

var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/client/main.js',
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?path=__webpack_hmr'
        ],
        vendor: [
            './src/client/includeLibrary.js',
            'webpack-hot-middleware/client?path=__webpack_hmr'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.join(__dirname, '/node_modules/')
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: path.join(__dirname, '/node_modules/')
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].[hash].js'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html', 
            path: path.resolve(__dirname, 'build'),
            title: 'TTT-Pre-Assignment',
            template: 'index.ejs'
        }),
        new webpack.HashedModuleIdsPlugin(),
    ]
};