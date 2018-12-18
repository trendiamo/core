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
  getHeaders() {
    return {
      'X-CSRF-TOKEN': localStorage.getItem('CSRF-TOKEN'),
    }
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
