import { apiSignOut } from './utils'
import queryString from 'query-string'
import { AUTH_CHECK, AUTH_GET_PERMISSIONS, AUTH_LOGOUT } from 'react-admin'

const authProvider = type => {
  if (type === AUTH_LOGOUT) {
    apiSignOut()
  }
  if (type === AUTH_CHECK) {
    const isPasswordForm = location.hash.substring(2).includes('password_reset?')
    const parsedUrl = queryString.parse(location.hash.split('?')[1])
    return (isPasswordForm && parsedUrl.reset_password_token) || (localStorage.getItem('authToken') && localStorage.getItem('authEmail'))
     ? Promise.resolve()
     : Promise.reject()
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const role = localStorage.getItem('authRole')
    return role ? Promise.resolve(role) : Promise.reject
  }
}

export default authProvider
