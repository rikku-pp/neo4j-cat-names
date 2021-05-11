/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  return {
    entry: './index.jsx',
    context: path.join(__dirname, './'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: 'since 2018'
                  }
                ],
                '@babel/preset-react'
              ]
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          loader: 'file-loader'
        },
        {
          test: /\.graphql$/i,
          use: 'raw-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx']
    },

    // This source map option allows us to see the code before transpilation,
    // just as it was authored. All modules are separated from each other:
    devtool: 'source-map',

    // Do not show bundle information except when error happens:
    stats: 'minimal',

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new webpack.EnvironmentPlugin(['HOSTNAME'])
      // new webpack.DefinePlugin({
      //   // Pass `API_URL` environment variable, defined in `.env`:
      //   API_URL: JSON.stringify(process.env.API_URL),
      // }),
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,

      // This allows `webpack-dev-server`, which is run from inside a container,
      // to listen to requests coming from the host:
      host: '0.0.0.0',

      port: process.env.PORT || 4001
    }
  }
}
