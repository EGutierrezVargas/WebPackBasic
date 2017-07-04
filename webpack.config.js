const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    dev: path.join(__dirname, './development'),
    build: path.join(__dirname, './dist')
};

module.exports = {
    entry: [PATHS.dev + '/js/app.js', PATHS.dev + '/scss/main.scss'],
    output: {
        path: PATHS.build, //Salida en donde leera los archivos html
        filename: './js/bundle.js' //Lectura de javascript
    },
    devServer: {
        port: 7000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: PATHS.dev + '/templates/index.pug', //La plantilla de salida para el path
            filename: PATHS.build + '/index.html' //Transpilación del archivo .html
        }),
        new HtmlWebpackPlugin({
            template: PATHS.dev + '/templates/header.pug', //La plantilla de salida para el path
            filename: PATHS.build + '/header.html' //Transpilación del archivo .html
        }),
        new ExtractTextPlugin({ // Extraer el archivo de scss a css
            filename: './css/bundle.css',
            allChunks: true,
        }),
    ],
    module: {
        rules: [{
                test: /\.pug$/,
                loaders: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']), // compiles Sass to CSS
            }
        ]
    }
}