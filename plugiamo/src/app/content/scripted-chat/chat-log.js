import getFrekklsConfig from 'frekkls-config'
import { chatDataProvider, listeners } from './shared'

const chatOptions = {
  list: null,
  reset() {
    this.list = null
  },
  get() {
    return this.list
  },
  load({ option, data, hackathon = false }) {
    if (!this.list) {
      this.list = this.getFromData(data, hackathon)
      this.postProcess()
    }
    this.filter(option)
  },
  filter(option) {
    this.list = this.list.filter(e => (e.id ? e.id !== option.id : e.text !== option.text))
  },
  postProcess() {
    this.list = getFrekklsConfig().processChatOptions(this.list)
  },
  getFromData(data, hackathon) {
    if (!hackathon) {
      return data.filter(e => e.type === 'option')
    }
    return Object.keys(data.logs).map(text => ({ type: 'option', text }))
  },
}

const logs = {
  list: [],
  hackathon: false,
  client: null,
  init({ data, client, initialStepId }) {
    this.list = []
    this.hackathon = !!data
    this.data = data
    this.client = client
    chatOptions.reset()
    this.load(this.hackathon ? { text: 'default' } : { messageId: initialStepId })
  },
  load(option) {
    if (!this.hackathon) {
      return this.fetchRemote(option)
    }
    this.fetchLocal(option)
  },
  fetchRemote(option) {
    if (!option.messageId) console.error('No destination chat step for option', option)
    chatDataProvider.fetchStep({ client: this.client, id: option.messageId, callback: this.afterFetchRemote(option) })
  },
  fetchLocal(option) {
    chatOptions.load({ option, data: this.data, hackathon: this.hackathon })
    const messages = this.data.logs[option.text]
    const messageLogs = messages.map(message => ({ type: 'message', message }))
    this.add(messageLogs)
  },
  add(data) {
    this.list = [...this.list, ...data, ...chatOptions.get()]
    listeners.fireAll({ data: this.list })
  },
  afterFetchRemote(option) {
    return data => {
      chatOptions.load({ option, data })
      data = data.filter(e => e.type === 'message')
      this.add(data)
    }
  },
}

const chatLog = {
  init({ data, client, initialStepId, ...props }) {
    listeners.reset(props.listeners)
    logs.init({ data, client, initialStepId })
  },
  selectOption(option) {
    logs.load(option)
  },
}

export default chatLog
