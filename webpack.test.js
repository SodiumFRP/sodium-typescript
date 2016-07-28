var webpack = require('webpack');
var path = require('path');

var testSourceDir = '../spec';

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    module: {
        /**
         * Array of module loaders
         *
         * See: http://webpack.github.io/docs/configuration.html#module-loaders
         */
        loaders: [
            /**
             * TypeScript loader
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             */
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules|bower_components|dist)/
            }
        ]
    },
    resolve: {
        root: path.resolve(testSourceDir),
        extensions: ['', '.js', '.ts']
    }
};
