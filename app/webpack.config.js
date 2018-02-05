/* eslint-disable */
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../assets'),
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
        query: {
          presets: ['env', 'react', 'stage-2'],
        },
      },
    ],
  },
  plugins: [new webpack.EnvironmentPlugin(['API_ENDPOINT'])],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watch: true,
}
