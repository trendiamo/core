import feed from 'feed'
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
    case '/collections/frontpage':
      return feed()
  }
}

app()
