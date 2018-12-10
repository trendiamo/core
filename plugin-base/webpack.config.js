/* eslint-disable */
const path = require('path')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'plugin-base.js',
    libraryTarget: 'umd',
  },
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React',
    },
    'styled-components': {
      amd: 'styled-components',
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      root: 'StyledComponents',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            options: {
              presets: ['env', 'react', 'stage-2'],
            },
            loader: 'babel-loader',
          },
        ],
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
