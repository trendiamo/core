/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const Dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['./src/index.js'],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    disableHostCheck: true,
    open: true,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
    host: '0.0.0.0',
    proxy: { '/graphql': 'http://localhost:5000' },
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')],
        type: 'javascript/auto',
      },
      {
        test: /\.mjs$/,
        include: [/node_modules/],
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        use: [{ loader: './svg-hoc-loader' }, 'svg-loader'],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://0.0.0.0:8080/',
    chunkFilename: '[name].js',
    filename: 'plugin.js',
  },
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
  plugins: [new Dotenv(), new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true })],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watch: true,
}
