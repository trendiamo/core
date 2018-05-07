import auth from 'auth'
import feed from 'feed'
import homepage from 'homepage'
import product from 'product'

const app = () => {
  auth()
  switch (location.pathname) {
    case '/':
      return homepage()
  }
  if (/\/collections\/.*\/products\/.+/.test(location.pathname)) {
    return product()
  } else if (/\/collections\/.+/.test(location.pathname)) {
    return feed()
  }
}

app()
