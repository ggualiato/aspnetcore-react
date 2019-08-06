const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

let config = (env, options) => {
    let isProduction = env === 'production'

    if (env && env.NODE_ENV && env.NODE_ENV !== 'development') {
        isProduction = true;
    } else if (options && options.mode === 'production') {
        isProduction = true;
    } else {
        isProduction = false;
    }

    return {
        entry: {
            client: './ClientApp/app.js'
        },
        mode: 'development',
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            publicPath: '/dist/',
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist'),
                publicPath: '/dist/',
                filename: 'styles.css'
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}

module.exports = config