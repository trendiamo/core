import auth from 'auth'
import checkFence from 'fenced-collection'
import collection from 'collection'
import homepage from 'homepage'
import product from 'product'

const app = async () => {
  auth()
  await checkFence()
  switch (location.pathname) {
    case '/':
      return homepage()
  }
  if (/\/collections\/.*\/products\/.+/.test(location.pathname)) {
    return product()
  }
  //  else if (/\/collections\/.+/.test(location.pathname)) {
  //   return collection()
  // }
}

app()
