const path = require('path');
const webpack = require('webpack');
const memoryfs = require('memory-fs');

module.exports = (fixture, options = {}) => {
    const compiler = webpack({
        context: __dirname,
        entry: `../stubs/${fixture}`,
        mode: 'none',
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: [
                        {
                            options,
                            loader: path.resolve(__dirname, '../../index.js'),
                        },
                        'svg-sprite-loader',
                        'svgo-loader',
                    ]
                }
            ],
        },
        output: {
            path: path.join(__dirname),
            filename: 'bundle.js',
        }
    });

    compiler.outputFileSystem = new memoryfs();

    return new Promise((resolve) => {
        compiler.run((_, stats) => {
            resolve(stats);
        });
    });
};
