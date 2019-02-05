const STEP_DELAY = 250

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
  addLog(log, timestampParam) {
    if (timestampParam !== this.timestamp) return // prevent duplicates if user opens & closes repeatedly and fast
    this.logs.push(log)
    this.listeners.forEach(fn => fn(this))
  },
  run() {
    let timeout = 0
    this.module.logs.default.forEach(chatMessage => {
      const log = { type: 'message', chatMessage }
      timeout += STEP_DELAY
      setTimeout(() => this.addLog(log, this.timestamp), timeout)
    })
    timeout += STEP_DELAY
    const chatOptions = Object.keys(this.module.logs).filter(e => e !== 'default')
    chatOptions.forEach(chatOptionKey => {
      const chatOption = { text: chatOptionKey, chatMessages: this.module.logs[chatOptionKey] }
      const log = { type: 'option', chatOption }
      setTimeout(() => this.addLog(log, this.timestamp), timeout)
    })
  },
  addChatMessages(chatMessages) {
    let timeout = 0
    chatMessages.forEach(chatMessage => {
      const log = { type: 'message', chatMessage }
      timeout += STEP_DELAY
      setTimeout(() => this.addLog(log, this.timestamp), timeout)
    })
  },
  setLogs(logs) {
    this.logs = logs
  },
}

export default chatLog
