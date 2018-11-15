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

export default auth
