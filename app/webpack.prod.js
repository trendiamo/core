/* eslint-disable */
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  watch: false,
})
