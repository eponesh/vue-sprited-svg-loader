const path = require('path');

module.exports = {
    entry: './sources/index.js',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: path.resolve('../index.js'),
                        options: {
                            customClass: 'icon',
                        }
                    },
                    'svg-sprite-loader',
                    'svgo-loader',
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    }
};
