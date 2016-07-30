var webpack = require('webpack');
var path = require('path');
var argv = require('yargs').argv;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var libraryName = 'Sodium';
var sourceDir = './src';
var distDir = './dist/lib';
var sourceEntryPoint = './src/lib/Sodium.ts';

var plugins = [], outputFile;

if (argv.build == 'prod') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName.toLowerCase() + '.umd.min.js';
} else {
    outputFile = libraryName.toLowerCase() + '.umd.js';
}

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    /**
     * The entry point for the bundle
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: sourceEntryPoint,

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {
        /**
         * The output directory as absolute path (required).
         *
         * See: http://webpack.github.io/docs/configuration.html#output-path
         */
        path: path.resolve(distDir),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: outputFile,

        /**
         * Set the bundle as library
         *
         * See: http://webpack.github.io/docs/configuration.html#output-library
         */
        library: libraryName,

        /**
         * Set the target library format
         *
         * See: http://webpack.github.io/docs/configuration.html#output-librarytarget
         *      https://github.com/umdjs/umd
         */
        libraryTarget: 'umd',

        /**
         * Set a name for AMD module
         *
         * See: http://webpack.github.io/docs/configuration.html#output-umdnameddefine
         */
        umdNamedDefine: true
    },
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
        root: path.resolve(sourceDir),
        extensions: ['', '.js', '.ts']
    },
    plugins: plugins
};
