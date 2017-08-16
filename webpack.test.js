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
        rules: [
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: /(node_modules|bower_components|dist)/
            },
        ]
    },
      resolve: {
        modules: [path.resolve(testSourceDir), "node_modules"],
        extensions: ['.js', '.ts']
    }
};
