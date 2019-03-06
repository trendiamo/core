/* eslint-disable */
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(), // webpack 3 option
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  // optimization is only for webpack 4, we're forced to use webpack 3 for now because of... preact-router?
  // optimization: {
  //   minimize: true,
  // },
  watch: false,
})
