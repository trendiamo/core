import { apiSignOut } from './utils'
import { AUTH_LOGOUT } from 'react-admin'

const authProvider = type => {
  if (type === AUTH_LOGOUT) {
    apiSignOut()
  }
}

export default authProvider
