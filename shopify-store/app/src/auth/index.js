const newAuth = () => ({
  addAuthListener(fn) {
    this.authListeners.push(fn)
  },
  authListeners: null,
  clear() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
    this.email = null
    this.token = null
    this.metadata = null
    this.isLoggedIn = false
    this.authListeners.forEach(fn => fn(false))
  },
  email: null,
  headers() {
    return {
      'X-USER-EMAIL': localStorage.getItem('authEmail'),
      'X-USER-TOKEN': localStorage.getItem('authToken'),
    }
  },
  init() {
    this.authListeners = []
    this.email = localStorage.getItem('authEmail')
    this.token = localStorage.getItem('authToken')
    this.metadata = null
    this.isLoggedIn = !!(this.email || this.token)
  },
  isLoggedIn: null,
  metadata: null,
  removeAuthListener(fn) {
    this.authListeners = this.authListeners.filter(e => fn.toString() !== e.toString())
  },
  set(email, token) {
    localStorage.setItem('authEmail', email)
    localStorage.setItem('authToken', token)
    this.email = email
    this.token = token
    this.isLoggedIn = true
    this.authListeners.forEach(fn => fn(true))
  },
  setMetadata(newMetadata) {
    this.metadata = { ...this.metadata, ...newMetadata }
    this.authListeners.forEach(fn => fn(this.metadata))
  },
  token: null,
})

const authFactory = () => {
  if (!window.__trndAuth) {
    const auth = newAuth()
    auth.init()
    window.__trndAuth = auth
  }
  return window.__trndAuth
}

export default authFactory
