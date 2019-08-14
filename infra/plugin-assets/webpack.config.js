var path = require('path');

module.exports = {
  entry: {
    'data-gathering/baldessarini': path.resolve(__dirname, 'src/data-gathering/baldessarini.js'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  mode: 'development'
}
