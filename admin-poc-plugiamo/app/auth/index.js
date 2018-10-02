import { apiSignIn } from './utils'
import auth from './auth-object'
import { AUTH_LOGIN } from 'react-admin'

const authClear = ({ auth }) => {
  auth.clear()
}

const authProvider = type => {
  if (type === AUTH_LOGIN) {
    // const { username, password } = params
    apiSignIn({ user: loginForm }, auth)
  }
  // return Promise.resolve()
}

export default authProvider
