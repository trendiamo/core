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
  addLogs(chatMessages, chatOptions) {
    const messageLogs = chatMessages.map(chatMessage => ({ type: 'message', chatMessage }))
    const optionLogs = chatOptions.map(chatOption => ({ type: 'option', chatOption }))
    const logs = messageLogs.concat(optionLogs)
    this.addNextLog(logs, this.timestamp)
  },
  addLog(log, timestampParam) {
    if (timestampParam !== this.timestamp) return // prevent duplicates if user opens & closes repeatedly and fast
    this.logs.push(log)
    this.listeners.forEach(fn => fn(this))
  },
  addNextLog(logs, timestampParam) {
    const [nextLog, ...otherLogs] = logs
    if (!nextLog) return
    if (nextLog.type === 'message') {
      nextLog.nextLogs = otherLogs
      setTimeout(() => this.addLog(nextLog, timestampParam), STEP_DELAY)
    } else {
      setTimeout(() => {
        this.addLog(nextLog, timestampParam)
        otherLogs.forEach(otherLog => this.addLog(otherLog, timestampParam))
      }, STEP_DELAY)
    }
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
