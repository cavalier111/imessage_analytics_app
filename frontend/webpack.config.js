const path = require('path');
const Dotenv = require('dotenv-webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
            test: /\.scss/,
            use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        // systemvars true will prevent local env var NODE_ENV from overriding heroku config var NODE_ENV
        new Dotenv({ systemvars: true })
        // new HtmlWebpackPlugin({
        //     template: "./public/index.html",
        //     filename: "./index.html"
        //  })
    ]
}