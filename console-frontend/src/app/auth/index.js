import { AUTH_CHECK } from 'react-admin'
import queryString from 'query-string'

const auth = {
  clear() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
  },
  getEmail() {
    return localStorage.getItem('authEmail')
  },
  getHeaders() {
    return {
      'X-USER-EMAIL': this.getEmail(),
      'X-USER-TOKEN': this.getToken(),
    }
  },
  getToken() {
    return localStorage.getItem('authToken')
  },
  isLoggedIn() {
    return this.getEmail() && this.getToken()
  },
  setAuth({ authEmail, authToken }) {
    localStorage.setItem('authEmail', authEmail)
    localStorage.setItem('authToken', authToken)
  },
}

const authProvider = type => {
  // triggered every time url changes
  if (type === AUTH_CHECK) {
    const isPasswordForm = window.location.pathname.includes('password_reset')
    const parsedUrl = queryString.parse(window.location.search)
    // check if either the user is on the change password page or is logged in. In which case redirects won't render the
    // login page automatically
    return (isPasswordForm && parsedUrl.reset_password_token) || auth.isLoggedIn()
      ? Promise.resolve()
      : Promise.reject()
  }
  // will be used in future if we want to add authorization for ceratin roles on certain pages triggered with authorization component
  // if (type === AUTH_GET_PERMISSIONS) {
  //   const role = localStorage.getItem('authRole')
  //   return role ? Promise.resolve(role) : Promise.reject
  // }
}

export { authProvider }
export default auth
