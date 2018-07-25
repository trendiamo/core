import collections from 'collections'
// import checkFence from 'fenced-collection'
// import collection from 'collection'
// import homepage from 'homepage'
// import product from 'product'
import replaceAuth from 'auth'

const app = async () => {
  replaceAuth()
  console.log(`run app for ${location.pathname}`)
  // await checkFence()
  switch (location.pathname) {
    // case '/':
    //   return homepage()
    case '/collections':
      return collections()
  }
  // if (/\/collections\/.*\/products\/.+/.test(location.pathname)) {
  //   return product()
  // }
  //  else if (/\/collections\/.+/.test(location.pathname)) {
  //   return collection()
  // }
}

app()
