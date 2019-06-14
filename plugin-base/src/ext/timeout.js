// Simplifies the use of timeouts and their interaction with react's state

const timeout = {
  list: {},
  set(name, callback, delay, isInterval) {
    if (!this.list[name]) this.list[name] = []
    const generate = () => (isInterval ? setInterval(callback, delay) : setTimeout(callback, delay))
    this.list[name].push(generate())
  },
  clear(name, isInterval) {
    if (this.list[name]) {
      this.list[name].map(item => {
        isInterval ? clearInterval(item) : clearTimeout(item)
      })
      delete this.list[name]
    }
  },
}

export default timeout
