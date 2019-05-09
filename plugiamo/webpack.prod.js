/* eslint-disable */
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('./webpack.config.js')

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    minimize: true,
  },
  watch: false,
})
