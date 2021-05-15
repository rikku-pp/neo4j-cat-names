/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.EnvironmentPlugin({
      URL: process.env.URL,
      API_URL: process.env.API_URL,
      NODE_ENV: 'production',
      DEBUG: false
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
