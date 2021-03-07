"use strict";

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require("path");
// var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: "production",
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/,
                enforce: "pre",
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader : 'ts-loader' }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.mustache$/i,
                loader: 'mustache-loader',
                options: {
                    minify: true,
                    tiny: true,
                },
            },
            // Needed because of @google-cloud/scheduler. See:
            // https://github.com/googleapis/google-cloud-node/issues/2933#issuecomment-609386039
            {
                // For node binary relocations, include ".node" files as well here
                test: /\.(m?js|node)$/,
                // it is recommended for Node builds to turn off AMD support
                parser: { amd: false },
                use: {
                  loader: '@zeit/webpack-asset-relocator-loader',
                  options: {
                    // optional, base folder for asset emission (eg assets/name.ext)
                    outputAssetBase: 'assets',
                    // optional, restrict asset emissions to only the given folder.
                    filterAssetBase: process.cwd(),
                    // optional, permit entire __dirname emission
                    // eg `const nonAnalyzable = __dirname` can emit everything in the folder
                    emitDirnameAll: false,
                    // optional, permit entire filterAssetBase emission
                    // eg `const nonAnalyzable = process.cwd()` can emit everything in the cwd()
                    emitFilterAssetBaseAll: false,
                    // optional, a list of asset names already emitted or
                    // defined that should not be emitted
                    existingAssetNames: [],
                    wrapperCompatibility: false, // optional, default
                    // build for process.env.NODE_ENV = 'production'
                    production: true, // optional, default is undefined
                    cwd: process.cwd(), // optional, default
                    debugLog: false, // optional, default
                  }
                }
            }
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new WebpackBuildNotifierPlugin({
            title: "Firebase Functions - Mikor oltanak?",
        }),
        new CopyWebpackPlugin([
            "assets/package.json",
            // "assets/.gcloudignore",
        ]),

        // // force unused dialects to resolve to the only one we use
		// // and for whom we have the dependencies installed
		// new webpack.ContextReplacementPlugin(/knex\/lib\/dialects/, /postgres\/index.js/),
		// // pg optionally tries to require pg-native
		// // replace it by a noop (real module from npm)
        // new webpack.NormalModuleReplacementPlugin(/pg-native/, 'noop2'),

        new webpack.NormalModuleReplacementPlugin(/\.\.\/migrate/, '../util/noop.js'),
        new webpack.NormalModuleReplacementPlugin(/\.\.\/seed/, '../util/noop.js'),
        new webpack.IgnorePlugin(/mariasql/, /\/knex\//),
        new webpack.IgnorePlugin(/mssql/, /\/knex\//),
        new webpack.IgnorePlugin(/mysql/, /\/knex\//),
        new webpack.IgnorePlugin(/mysql2/, /\/knex\//),
        new webpack.IgnorePlugin(/oracle/, /\/knex\//),
        new webpack.IgnorePlugin(/oracledb/, /\/knex\//),
        new webpack.IgnorePlugin(/sqlite3/, /\/knex\//),
        new webpack.IgnorePlugin(/strong-oracle/, /\/knex\//),
        new webpack.IgnorePlugin(/pg-native/, /\/pg\//),
    ],
    target: 'node',
    // externals: [nodeExternals()],
    externals: {
        'firebase-admin': 'firebase-admin',
        'firebase-functions': 'firebase-functions',
    },
    entry: {
        index: [
            path.resolve(__dirname, "src/index.ts"),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle'),
        libraryTarget: 'commonjs2',
        publicPath: "/",
    },
}
