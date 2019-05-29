module.exports = function override(config) {
  // Here we need to find config from react-scripts and rewrite babelrc option to true
  // because we need to use babel-plugin-transform-imports in order to reduce build time
  config.module.rules.forEach(function(item) {
    if (item.oneOf) {
      item.oneOf[1].options.babelrc = true
    }
  })

  return config
}
