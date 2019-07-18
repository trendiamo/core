import routes from 'app/routes'

const auth = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  clear() {
    localStorage.removeItem('CSRF-TOKEN')
    localStorage.removeItem('authUser')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('accounts')
    window.location.href = routes.login()
  },
  getSlug() {
    return window.location.pathname.startsWith('/a/') && window.location.pathname.split('/')[2]
  },
  getAccount() {
    return this.getAccounts()[this.getSlug()]
  },
  setAccount(account) {
    localStorage.setItem('accounts', JSON.stringify({ ...this.getAccounts(), [this.getSlug()]: account }))
  },
  getAccounts() {
    const accountsJson = localStorage.getItem('accounts')
    return accountsJson ? JSON.parse(accountsJson) : {}
  },
  getAccountRole() {
    const roles = this.getUser().roles
    return roles && roles[this.getSlug()]
  },
  getHeaders() {
    const headers = {
      'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN'),
    }
    const accountSlug = this.getSlug()
    return accountSlug ? { ...headers, 'X-SESSION-ACCOUNT': accountSlug } : headers
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
  isAdmin() {
    return this.getUser().admin
  },
  isSingleAccount() {
    return !this.isAdmin() && Object.keys(this.getUser().roles).length === 1
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
}

export default auth
