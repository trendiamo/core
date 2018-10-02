import { apiSignIn, apiSignOut } from './utils'
// import auth from './auth-object'
import { AUTH_LOGIN, AUTH_LOGOUT } from 'react-admin'

const authProvider = (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params
    apiSignIn({ user: { email: username, password: password } })
    return Promise.resolve()
  }
  if (type === AUTH_LOGOUT) {
    apiSignOut()
    // apiSignOut({ user: { email: username, password: password } })
  }
}

export default authProvider
