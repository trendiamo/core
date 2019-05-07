import { listeners } from 'tools'

const chatOptions = {
  list: null,
  callbacks: {},
  reset() {
    this.list = null
  },
  get() {
    return this.list
  },
  load({ option, data, specialFlow = false }) {
    if (!this.list) {
      this.list = this.getFromData(data, specialFlow)
      this.postProcess()
    }
    this.filter(option)
  },
  filter(option) {
    this.list = this.list.filter(e => (e.id ? e.id !== option.id : e.text !== option.text))
  },
  postProcess() {
    if (!this.callbacks.processChatOptions) return
    this.list = this.callbacks.processChatOptions(this.list)
  },
  getFromData(data, specialFlow) {
    if (!specialFlow) {
      return data.simpleChat.simpleChatSteps.map(chatStep => ({
        text: chatStep.key,
        type: 'option',
      }))
    }
    return Object.keys(data.logs).map(text => ({ type: 'option', text }))
  },
  specifyCallbacks(callbacks) {
    this.callbacks = callbacks || {}
  },
}

const logs = {
  list: [],
  specialFlow: false,
  init({ data, specialFlow, callbacks }) {
    this.list = []
    this.specialFlow = specialFlow
    this.data = data
    chatOptions.reset()
    chatOptions.specifyCallbacks(callbacks)
    this.load({ text: 'default' })
  },
  load(option) {
    chatOptions.load({ option, data: this.data, specialFlow: this.specialFlow })
    const messages = this.findMessages(option)
    const messageLogs = messages.map(message => ({ type: 'message', message }))
    this.add(messageLogs)
    this.afterFetch(option)
  },
  findMessages(option) {
    if (this.specialFlow) {
      return this.data.logs[option.text]
    }
    return this.data.simpleChat.simpleChatSteps.find(e => e.key === option.text).simpleChatMessages
  },
  add(data) {
    this.list = [...this.list, ...data, ...chatOptions.get()]
    listeners.fireAll({ data: this.list })
  },
  afterFetch(option) {
    return data => {
      chatOptions.load({ option, data })
      data = data.filter(e => e.type === 'message')
      this.add(data)
    }
  },
}

const chatLog = {
  init(props) {
    listeners.reset(props.listeners)
    logs.init(props)
  },
  selectOption(option) {
    logs.load(option)
  },
}

export default chatLog
