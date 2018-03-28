import feed from 'feed'
import homepage from 'homepage'
import product from 'product'
import { account, signIn, signUp } from 'auth'

const app = () => {
  switch (location.pathname) {
    case '/account':
      return account()
    case '/account/login':
      return signIn()
    case '/account/register':
      return signUp()
    case '/':
      return homepage()
  }
  if (/\/collections\/.+/.test(location.pathname)) {
    return feed()
  } else if (/\/collections\/.*\/products\/.+/.test(location.pathname)) {
    return product()
  }
}

app()
