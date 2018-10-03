const history = {
  callbacks: [],
  listen(callback) {
    this.callbacks.push(callback)
  },
  location: '/',
  replace(url) {
    this.location = url
    this.callbacks.forEach(callback => callback(url))
  },
}

export default history
