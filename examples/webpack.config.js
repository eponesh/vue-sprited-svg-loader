const path = require('path');
const babelOptions = {
    presets: [
        ["@babel/preset-env", { modules: false }]
    ]
};
const babelLoaderOptions = {
    loader: 'babel-loader',
    options: babelOptions
};
const exclude = /node_modules/;

module.exports = {
    entry: './sources/index.js',
    target: 'node',
    module: {
        rules: [
            {
                exclude,
                test: /\.js(x?)$/,
                use: [babelLoaderOptions]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: path.resolve('../index.js'),
                        options: {
                            withStyle: true,
                            customClass: 'icon',
                        }
                    },
                    'svg-sprite-loader',
                    'svgo-loader',
                ]
            }
        ],
    },
    target: 'web',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    devServer: {
        host: 'localhost',
        publicPath: '/dist/',
        contentBase: path.resolve(__dirname, 'examples'),
        watchContentBase: true,
        compress: true,
        port: 9001
    }
};
