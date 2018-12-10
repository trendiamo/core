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
})
