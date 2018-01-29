var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/feed.js',
  output: {
    path: path.resolve(__dirname, '../assets'),
    filename: 'feed.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './src')],
        query: {
          presets: ['env', 'react', 'stage-2']
        }
      }
    ]
  },
  plugins: [new webpack.EnvironmentPlugin(['API_ENDPOINT'])],
  watch: true
}
