'use strict';

const path = require('path');
const buildConfig = require('./build.config').getConfig();
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackConfig = {
    mode: buildConfig.minify ? 'production' : 'development',
    devtool: buildConfig.sourceMaps ? 'source-maps' : false,

    entry: buildConfig.entry,
    output: {
        path: buildConfig.buildDir,
        filename: buildConfig.bundleName,
        libraryTarget: buildConfig.target,
        library: buildConfig.targetName,
        publicPath: '',
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            declaration: true
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts']
    },

    plugins: [
        new CleanWebpackPlugin([
            path.join(buildConfig.buildDir, '*'),
            path.resolve(__dirname, 'build', 'types', '*')
        ])
    ]
}

module.exports = webpackConfig;