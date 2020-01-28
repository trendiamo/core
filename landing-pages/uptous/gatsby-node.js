// const path = require('path')
// const fs = require('fs').promises
// const glob = require('glob')
//
// exports.onPostBuild = async () => {
//   const publicPath = path.join(__dirname, 'public')
//
//   const htmlAndJSFiles = glob.sync(`${publicPath}/**/*.{html,js}`)
//   console.log('[onPostBuild] Replacing page-data.json references in the following files:')
//   for (let file of htmlAndJSFiles) {
//     const stats = await fs.stat(file, 'utf8')
//     if (!stats.isFile()) return
//     console.log(file)
//     var content = await fs.readFile(file, 'utf8')
//     var result = content.replace('https://static.datacamp.com/page-data', '/page-data')
//     await fs.writeFile(file, result, 'utf8')
//   }
// }

const util = require('util')
const md5 = require('md5')
const path = require('path')
const fs = require('fs')
const glob = require('glob')

const hash = md5(`${new Date().getTime()}`)

const addPageDataVersion = async file => {
  const stats = await util.promisify(fs.stat)(file)
  if (stats.isFile()) {
    console.log(`Adding version to page-data.json in ${file}..`)
    let content = await util.promisify(fs.readFile)(file, 'utf8')
    const result = content.replace(/page-data.json(\?v=[a-f0-9]{32})?/g, `page-data.json?v=${hash}`)
    await util.promisify(fs.writeFile)(file, result, 'utf8')
  }
}

exports.onPostBootstrap = async () => {
  const loader = path.join(__dirname, 'node_modules/gatsby/cache-dir/loader.js')
  await addPageDataVersion(loader)
}

exports.onPostBuild = async () => {
  const publicPath = path.join(__dirname, 'public')
  const htmlAndJSFiles = glob.sync(`${publicPath}/**/*.{html,js}`)
  for (let file of htmlAndJSFiles) {
    await addPageDataVersion(file)
  }
}
