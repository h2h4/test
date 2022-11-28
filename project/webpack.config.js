/** @typedef {import("webpack").Configuration} Configuration */
/** @typedef {import("webpack-dev-server").Configuration} DevServerConfiguration */

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const createConfig = (env, options) => {
    /** @type {Configuration} */
    const common = {
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            modules: [
                path.resolve(__dirname, './src'),
                path.resolve(__dirname, './node_modules'),
            ],

        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            projectReferences: true,
                        },
                    },
                },
            ],
        },
        output: {
            publicPath: '/',
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        performance: {
            maxEntrypointSize: 3 * 1024 * 1024,
            maxAssetSize: 3 * 1024 * 1024,
        },
        stats: { modules: false, children: false, entrypoints: false },

    };

    /** @type {Configuration} */
    const specific = env.dev ? {
        mode: 'development',
        devtool: 'source-map',
        /** @type {DevServerConfiguration} */
        devServer: {
            port: 3000,

        },
        plugins: [
            new webpack.ProgressPlugin(),
        ],
        stats: { assets: false },
    } : {
        mode: 'production',
    };
    return merge(common, options, specific);
};

const createConfigs = (env, args) => {
    const configs = args.map((x) => createConfig(env, x));
    for (let i = 0; i < configs.length; i++) {
        if (i !== 0) delete configs[i].devServer;
    }
    return configs;
};

const create = (env) => {

    /** @type {Configuration} */
    const bulid = {
        entry: {

            index: './src/index.ts',
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: './src/index.html', to: './index.html' },
                    { from: './src/index.css', to: './index.css' },
                    { from: './src/favicon.ico', to: './favicon.ico' },
                    { from: './package.json', to: './package.json' },
                    
                ],
            }),
        ],
    };
    return createConfigs(env, [bulid])[0];
};

module.exports = create;