const path = require('path')

module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'entry' }]],
  plugins: [
    ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
  ],
}
