const history = {
  addListener(callback) {
    this.callbacks.push(callback)
  },
  callbacks: [],
  location: '/',
  removeListener(callback) {
    this.callbacks = this.callbacks.filter(e => e !== callback)
  },
  removeListeners() {
    this.callbacks = []
  },
  replace(url) {
    this.location = url
    this.callbacks.forEach(callback => callback(url))
  },
}

export default history
