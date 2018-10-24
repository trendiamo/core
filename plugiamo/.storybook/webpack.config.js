// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
var path = require('path')

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [{ loader: './svg-hoc-loader' }, 'svg-loader'],
        include: [path.resolve(__dirname, '../src')],
      },
    ],
  },
  resolve: {
    alias: {
      // react: 'preact-compat',
      react: path.resolve(__dirname, '../src/ext/preact-compat'),
      'react-dom': 'preact-compat',
    },
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
  },
}
