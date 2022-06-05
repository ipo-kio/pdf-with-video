const merge = require('webpack-merge');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let base_config = {
    context: __dirname,
    entry: {
        'pdf-worker': 'pdfjs-dist/build/pdf.worker.entry',
        'lecture-viewer': './src/lecture-viewer/ts/lecture-notes-and-video-viewer.ts',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "",
        filename: '[name].js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/lecture-viewer/lecture-viewer.html', to: '.'},
                {from: './node_modules/pdfjs-dist/web/pdf_viewer.css', to: '.'},
                {from: './node_modules/pdfjs-dist/web/images', to: 'images'}
            ]
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};

let prod_configuration = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true
            })
        ]
    }
};

let debug_configuration = {
    mode: 'development',
    devtool: 'inline-source-map'
};

module.exports = env => {
    let config;
    if (env && env.mode === 'prod')
        config = merge.merge(base_config, prod_configuration);
    else
        config = merge.merge(base_config, debug_configuration);

    console.log('config', config);
    return config;
};
