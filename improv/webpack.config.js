/* eslint-disable */
const Dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    disableHostCheck: true,
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
    host: '0.0.0.0',
    proxy: { '/graphql': 'http://localhost:5000' },
  },
  entry: ['babel-polyfill', './src/index.js'],
  // entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'improv.js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
  plugins: [new Dotenv()],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watch: true,
}
