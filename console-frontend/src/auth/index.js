import routes from 'app/routes'

const auth = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  clear() {
    localStorage.removeItem('CSRF-TOKEN')
    localStorage.removeItem('authUser')
    localStorage.removeItem('loggedIn')
    window.location.href = routes.login()
  },
  getDisplayName() {
    const user = this.getUser()
    if (!user.firstName || !user.lastName) return null
    return `${user.firstName} ${user.lastName}`
  },
  getHeaders() {
    return {
      'X-CSRF-TOKEN': this.getToken(),
    }
  },
  getToken() {
    return localStorage.getItem('CSRF-TOKEN')
  },
  setToken(token) {
    localStorage.setItem('CSRF-TOKEN', token)
  },
  setCsrfToken(json) {
    this.setToken(json.token)
    localStorage.setItem('loggedIn', json.loggedIn)
  },
  getUser() {
    if (!this.user) this.user = JSON.parse(localStorage.getItem('authUser') || '{}')
    return this.user
  },
  isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true'
  },
  listeners: [],
  removeListener(fn) {
    this.listeners = this.listeners.filter(e => e !== fn)
  },
  setAuth({ user }) {
    this.setUser(user)
  },
  setUser(user) {
    this.listeners.forEach(fn => fn(user))
    localStorage.setItem('authUser', JSON.stringify(user))
    localStorage.setItem('loggedIn', true)
  },
  user: null,
}

export default auth
