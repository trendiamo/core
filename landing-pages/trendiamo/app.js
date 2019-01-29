const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const env = process.env.SPIKE_ENV

module.exports = {
  devtool: 'source-map',
  ignore: ['**/layout.html', '**/_*', '**/.*', 'README.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    locals: (ctx) => ({
      pageId: pageId(ctx),
      description: 'Trendiamo: A tool to create and integrate your sales force on your website.'
    }),
    minify: env === 'production'
  }),
  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}

// <p>Example of locals: {{ foo }}</p>
// <p mdi> Example of **markdown**</p>
// <p>Example of "smart quotes" -- and dashes</p>
// <ul>
//   <li><a href="https://reshape.ml">reshape</a> for HTML transforms</li>
//   <li><a href="https://babeljs.io">babel</a> for JS transforms</li>
//   <li><a href="http://postcss.org">postcss</a> for CSS transforms</li>
//   <li><a href="http://webpack.github.io">webpack</a> for JS bundling</li>
// </ul>
