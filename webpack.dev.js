/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */

const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  // This source map option allows us to see the code before transpilation,
  // just as it was authored. All modules are separated from each other:
  devtool: 'source-map',
  // Do not show bundle information except when error happens:
  stats: 'minimal',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 4001
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      URL: process.env.URL,
      API_URL: process.env.API_URL,
      NODE_ENV: 'development'
    })
  ]
})
