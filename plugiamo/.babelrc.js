const path = require('path')

module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'entry' }]],
  plugins: [
    [
      'transform-imports',
      {
        'plugin-base': {
          transform: function(importName, matches) {
            return path.resolve(__dirname, 'plugin-base/plugin-base.js')
          },
          skipDefaultConversion: true,
        },
      },
    ],
    ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
    '@babel/plugin-proposal-class-properties',
  ],
}
