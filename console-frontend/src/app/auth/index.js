import { AUTH_CHECK } from 'react-admin'
import queryString from 'query-string'
import routes from 'app/routes'

const auth = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  clear() {
    localStorage.removeItem('authEmail')
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    window.location.href = routes.login()
  },
  getDisplayName() {
    const user = this.getUser()
    if (!user.firstName || !user.lastName) return null
    return `${user.firstName} ${user.lastName}`
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
  getUser() {
    if (!this.user) this.user = JSON.parse(localStorage.getItem('authUser') || '{}')
    return this.user
  },
  isLoggedIn() {
    return this.getEmail() && this.getToken()
  },
  listeners: [],
  removeListener(fn) {
    this.listeners = this.listeners.filter(e => e !== fn)
  },
  setAuth({ token, user }) {
    localStorage.setItem('authEmail', user.email)
    localStorage.setItem('authToken', token)
    this.setUser(user)
  },
  setUser(user) {
    localStorage.setItem('authUser', JSON.stringify(user))
    this.listeners.forEach(fn => fn(user))
  },
  user: null,
}

const authProvider = type => {
  // triggered every time url changes
  if (type === AUTH_CHECK) {
    const isPasswordForm = routes.isPasswordReset()
    const parsedUrl = queryString.parse(window.location.search)
    // check if either the user is on the reset password page or is logged in. In which case redirects won't render the
    // login page automatically
    return (isPasswordForm && parsedUrl.reset_password_token) || auth.isLoggedIn()
      ? Promise.resolve()
      : Promise.reject()
  }
  // will be used in future if we want to add authorization for certain roles on certain pages triggered with authorization component
  // if (type === AUTH_GET_PERMISSIONS) {
  //   const role = localStorage.getItem('authRole')
  //   return role ? Promise.resolve(role) : Promise.reject
  // }
}

export { authProvider }
export default auth
