const path = require('path')

module.exports = {
  presets: ['@babel/env'],
  plugins: [
    [
      'transform-imports',
      {
        '@material-ui/icons': {
          transform: '@material-ui/icons/${member}',
          preventFullImport: true,
        },
        '@material-ui/core': {
          transform: '@material-ui/core/${member}',
          preventFullImport: true,
        },
        'plugin-base': {
          transform: function(importName, matches) {
            return path.resolve(__dirname, 'plugin-base/plugin-base.js')
          },
          skipDefaultConversion: true,
        },
      },
    ],
  ],
}
