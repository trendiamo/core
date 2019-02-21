const chatLog = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  init(module) {
    this.module = module
    this.timestamp = Date.now()
    this.logs = []
    this.listeners = []
  },
  module: null,
  listeners: [],
  removeListener(fn) {
    this.listeners = this.listeners.filter(e => e !== fn)
  },
  removeListeners() {
    this.listeners = []
  },
  resetLogs() {
    this.logs = []
    this.listeners.forEach(fn => fn(this))
  },
  timestamp: null,
  addLogs(chatMessages, chatOptions) {
    const messageLogs = chatMessages.map(chatMessage => ({ type: 'message', chatMessage }))
    const optionLogs = chatOptions.map(chatOption => ({ type: 'option', chatOption }))
    const logs = messageLogs.concat(optionLogs)
    logs.map(log => {
      this.addLog(log, this.timestamp)
    })
  },
  addLog(log, timestampParam) {
    if (timestampParam !== this.timestamp) return // prevent duplicates if user opens & closes repeatedly and fast
    this.logs.push(log)
    this.listeners.forEach(fn => fn(this))
  },
  run() {
    const chatMessages = this.module.logs.default
    const chatOptions = Object.keys(this.module.logs)
      .filter(e => e !== 'default')
      .map(chatOptionKey => ({ text: chatOptionKey, chatMessages: this.module.logs[chatOptionKey] }))
    this.addLogs(chatMessages, chatOptions)
  },
  setLogs(logs) {
    this.logs = logs
  },
}

export default chatLog
