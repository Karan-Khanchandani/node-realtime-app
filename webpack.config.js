const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    data: path.join(__dirname, 'data')
}

module.exports = {
    context: path.src,
    entry: ['./app.js', './main.scss'],
    output: {
        filename: 'app.bundle.js',
        path: paths.dist,
        publicPath: 'dist'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract([
                    'css-loader', 'sass-loader'
                ])
            }
        ]
    },
    devServer: {
        contentBase: paths.dist,
        compress: true,
        port: '8084',
        stats: 'errors-only'

    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'main.bundle.css',
            allChunks: true
        }),
        new CopyWebpackPlugin([{
            from: paths.data,
            to: paths.dist + '/data'
        }])
    ]
}