import { apiSignOut } from './utils'
import { AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_LOGOUT } from 'react-admin'

const authProvider = type => {
  if (type === AUTH_LOGOUT) {
    apiSignOut()
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('authToken') && localStorage.getItem('authEmail') ? Promise.resolve() : Promise.reject()
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('authRole')
    return role ? Promise.resolve(role) : Promise.reject
  }
}

export default authProvider
