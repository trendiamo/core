module.exports = {
  webpack(config) {
    // Here we need to find config from react-scripts and rewrite babelrc option to true
    // because we need to use babel-plugin-transform-imports in order to reduce build time
    config.module.rules.forEach(function(item) {
      if (item.oneOf) {
        item.oneOf[1].options.babelrc = true
      }
    })

    // Remove the ModuleScopePlugin to be able to include files outside this project's /src
    config.resolve.plugins.length = 1

    return config
  },
  devServer(configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost)
      config.disableHostCheck = true
      return config
    }
  },
}
