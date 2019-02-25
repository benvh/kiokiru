'use strict';

const path = require('path');

/**
 * Instead of modifying webpack.config we can define some "environments"/"targets" in here...
 */
module.exports = {

    development: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        buildDir: path.resolve(__dirname, 'build', 'debug'),
        bundleName: 'kiokiru.js',

        target: 'umd',
        targetName: 'Kiokiru',
        minify: false,
        sourceMaps: true
    }, 

    production: {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        buildDir: path.resolve(__dirname, 'build', 'production'),
        bundleName: 'kiokiru.min.js',

        target: 'umd',
        targetName: 'Kiokiru',
        minify: true,
        sourceMaps: false
    },

    getConfig() {
        const configName = process.env['NODE_ENV'] != null ? process.env['NODE_ENV'] : 'development';
        if (this[configName] == null) throw new Error('No environment config for `' + configName + '`');
        return this[configName];
    }

}
