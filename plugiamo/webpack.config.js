/* eslint-disable */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'plugiamo.js',
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
    ],
  },
  // plugins: [new webpack.EnvironmentPlugin(['API_ENDPOINT'])],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  watch: true,
}
