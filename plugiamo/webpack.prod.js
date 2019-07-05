/* eslint-disable */
const config = require('./webpack.config.js')
const cp = require('child_process')
const dotenv = require('dotenv').config({ path: __dirname + '/.env' }).parsed
const merge = require('webpack-merge')
const RollbarSourcemapPlugin = require('rollbar-sourcemap-webpack-plugin')
const webpack = require('webpack')

let version
try {
  version = cp.execSync('git rev-parse -q --verify HEAD', { cwd: __dirname, encoding: 'utf8' })
} catch (err) {
  console.error('Error getting revision', err)
  process.exit(1)
}

module.exports = merge(config, {
  devtool: 'hidden-source-map',
  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    publicPath: 'https://js.frekkls.com/',
  },
  plugins: [
    dotenv.ROLLBAR_DEPLOY_TOKEN &&
      new RollbarSourcemapPlugin({
        accessToken: dotenv.ROLLBAR_DEPLOY_TOKEN,
        publicPath: 'https://js.frekkls.com',
        version,
      }),
    dotenv.ROLLBAR_DEPLOY_TOKEN &&
      new RollbarSourcemapPlugin({
        accessToken: dotenv.ROLLBAR_DEPLOY_TOKEN,
        publicPath: 'https://plugiamo.s3.eu-central-1.amazonaws.com',
        version,
      }),
  ].filter(p => p),
  watch: false,
})
