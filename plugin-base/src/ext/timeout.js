// Simplifies the use of timeouts and their interaction with react's state

const timeout = {
  list: {},
  namesCount: 0,
  set(name, callback, delay) {
    if (!this.list[name]) this.list[name] = []
    this.list[name].push(setTimeout(callback, delay))
  },
  clear(name) {
    if (this.list[name]) {
      this.list[name].map(item => {
        clearTimeout(item)
      })
      delete this.list[name]
    }
  },
  generateTimeoutName() {
    const name = `timeout_${this.namesCount}`
    this.namesCount++
    return name
  },
}

export default timeout
