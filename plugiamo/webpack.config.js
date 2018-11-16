/* eslint-disable */
const Dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'plugin.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            options: {
              presets: ['env', 'stage-2'],
            },
            loader: 'babel-loader',
          },
        ],
        include: [path.resolve(__dirname, './src')],
      },
      {
        test: /\.svg$/,
        use: [{ loader: './svg-hoc-loader' }, 'svg-loader'],
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
  plugins: [new Dotenv()],
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watch: true,
}
