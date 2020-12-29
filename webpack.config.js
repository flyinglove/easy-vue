const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: "body"
        })
    ]
}