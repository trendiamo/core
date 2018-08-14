import login from 'screens/login'
import register from 'screens/register'
import replaceAuth from 'auth/replace-auth'
import router from 'app/router'

export const entry = () => {
  replaceAuth()
  switch (location.pathname) {
    case '/account/login':
      return login()
    case '/account/register':
      return register()
  }
  if (/\/u\/.+/.test(location.pathname)) {
    return router()
  }
}

if (location.host !== 'trendiamo.com' || localStorage.getItem('trnd')) {
  entry()
}
