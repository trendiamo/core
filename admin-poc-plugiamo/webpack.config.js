/* eslint-disable */
const path = require('path')
const webpack = require('webpack')

const config = {
  entry: ['./index.js'],
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin(['API_ENDPOINT'])],
}

module.exports = config
