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
    case '/collections/frontpage':
      return feed()
  }
  if (/\/collections\/frontpage\/products\/.+/.test(location.pathname)) {
    return product()
  }
}

app()
