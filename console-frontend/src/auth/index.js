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
  getHeaders(isUntenanted = false) {
    const headers = {
      'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN'),
    }
    const accountSlug = this.getSlug()
    return accountSlug && !isUntenanted ? { ...headers, 'X-SESSION-ACCOUNT': accountSlug } : headers
  },
  setCsrfToken(json) {
    localStorage.setItem('CSRF-TOKEN', json.token)
    localStorage.setItem('loggedIn', json.loggedIn)
  },
  getUser() {
    if (!this.user) this.user = JSON.parse(localStorage.getItem('authUser') || '{}')
    if (!this.user.img) this.user.img = { url: this.user.imgUrl } // TODO: remove after 2019-10-16 (check https://github.com/trendiamo/core/pull/880)
    return this.user
  },
  isAffiliate() {
    const affiliateRole = this.getUser().affiliateRole
    // we test for !affiliateRole to cover for cached user object between deploys
    if (!affiliateRole) return false

    return affiliateRole !== 'not_affiliate'
  },
  isSeller() {
    return this.getUser().affiliateRole === 'seller'
  },
  isAdmin() {
    return this.getUser().admin
  },
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'
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
