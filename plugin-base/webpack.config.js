/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const exec = require('child_process').exec

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
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM',
    },
    'styled-components': {
      amd: 'styled-components',
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      root: 'StyledComponents',
    },
  },
  mode: 'development',
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
      {
        test: /\.svg$/,
        use: [{ loader: './svg-hoc-loader' }, 'svg-loader'],
        include: [path.resolve(__dirname, './src')],
      },
    ],
  },
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
          exec(
            'mkdir -p ../console-frontend/plugin-base && cp dist/plugin-base.js ../console-frontend/plugin-base && mkdir -p ../plugiamo/plugin-base && cp dist/plugin-base.js ../plugiamo/plugin-base',
            (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout)
              if (stderr) process.stderr.write(stderr)
            }
          )
        })
      },
    },
    new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
