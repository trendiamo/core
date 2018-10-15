import queryString from 'query-string'
import { AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin'

const authProvider = type => {
  if (type === AUTH_CHECK) {
    // triggered every time url changes
    const isPasswordForm = window.location.hash.substring(2).includes('password_reset?')
    const parsedUrl = queryString.parse(window.location.hash.split('?')[1])
    // check if either the user is on the change password page or is logged in. In which case redirects won't render the
    // login page automatically
    return (isPasswordForm && parsedUrl.reset_password_token) ||
      (localStorage.getItem('authToken') && localStorage.getItem('authEmail'))
      ? Promise.resolve()
      : Promise.reject()
  }
  if (type === AUTH_GET_PERMISSIONS) {
    // will be used in future if we want to add authorization for ceratin roles on certain pages
    // triggered with authorization component
    const role = localStorage.getItem('authRole')
    return role ? Promise.resolve(role) : Promise.reject
  }
}

export default authProvider
