const history = {
  addEventListener(callback) {
    this.callbacks.push(callback)
  },
  callbacks: [],
  location: '/',
  removeEventListener(callback) {
    this.callbacks = this.callbacks.filter(e => e !== callback)
  },
  removeEventListeners() {
    this.callbacks = []
  },
  replace(url) {
    this.location = url
    this.callbacks.forEach(callback => callback(url))
  },
}

export default history
