import routes from 'app/routes'

const auth = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  clear() {
    localStorage.removeItem('CSRF-TOKEN')
    localStorage.removeItem('authUser')
    localStorage.removeItem('loggedIn')
    this.clearAdminSessionAccount()
    window.location.href = routes.login()
  },
  getHeaders() {
    const csrfHeader = { 'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN') }
    return this.isAdmin() && window.location.pathname !== routes.admin()
      ? { ...csrfHeader, 'X-MANAGE-ACCOUNT': this.getAdminSessionAccount().id }
      : csrfHeader
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
  setAdminSessionAccount(account) {
    this.adminSessionAccount = account
    localStorage.setItem('adminSessionAccount', JSON.stringify(account))
  },
  getAdminSessionAccount() {
    if (!this.adminSessionAccount)
      this.adminSessionAccount = JSON.parse(localStorage.getItem('adminSessionAccount') || '{}')
    return this.adminSessionAccount
  },
  clearAdminSessionAccount() {
    this.adminSessionAccount = null
    localStorage.removeItem('adminSessionAccount')
  },
  isAdmin() {
    return this.getUser().admin
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
  adminSessionAccount: null,
}

export default auth
