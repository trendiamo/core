import routes from 'app/routes'
import { getSlug } from 'utils/shared'

const auth = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  clear() {
    localStorage.removeItem('CSRF-TOKEN')
    localStorage.removeItem('authUser')
    localStorage.removeItem('loggedIn')
    this.clearSessionData()
    window.location.href = routes.login()
  },
  getHeaders() {
    const headers = {
      'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN'),
    }
    return window.location.pathname === routes.accounts() ? headers : { ...headers, 'X-SESSION-ACCOUNT': getSlug() }
  },
  setCsrfToken(json) {
    localStorage.setItem('CSRF-TOKEN', json.token)
    localStorage.setItem('loggedIn', json.loggedIn)
  },
  getUser() {
    if (!this.user) this.user = JSON.parse(localStorage.getItem('authUser') || '{}')
    return this.user
  },
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'
  },
  setSessionAccount(account) {
    this.sessionAccount = account
    localStorage.setItem('sessionAccount', JSON.stringify(account))
  },
  getSessionAccount() {
    if (!this.sessionAccount) this.sessionAccount = JSON.parse(localStorage.getItem('sessionAccount') || '{}')
    return this.sessionAccount
  },
  clearSessionAccount() {
    this.sessionAccount = null
    localStorage.removeItem('sessionAccount')
  },
  setSessionRole(role) {
    this.sessionRole = role
    localStorage.setItem('sessionRole', JSON.stringify(role))
  },
  getSessionRole() {
    if (!this.sessionRole) this.sessionRole = JSON.parse(localStorage.getItem('sessionRole') || '{}')
    return this.sessionRole
  },
  clearSessionRole() {
    this.sessionRole = null
    localStorage.removeItem('sessionRole')
  },
  clearSessionData() {
    this.clearSessionAccount()
    this.clearSessionRole()
  },
  isAdmin() {
    return this.getUser().admin
  },
  isRole(role) {
    return this.getSessionRole() === role
  },
  isSingleAccount() {
    return !auth.isAdmin() && Object.keys(auth.getUser().roles).length === 1
  },
  listeners: [],
  removeListener(fn) {
    this.listeners = this.listeners.filter(e => e !== fn)
  },
  setUser(user) {
    this.user = user
    this.listeners.forEach(fn => fn(user))
    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('loggedIn', true)
  },
  user: null,
  sessionAccount: null,
  sessionRole: null,
}

export default auth
