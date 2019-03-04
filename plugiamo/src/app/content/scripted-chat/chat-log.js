import getFrekklsConfig from 'frekkls-config'
import { listeners } from './shared'

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
      return data.simpleChat.simpleChatSteps.map(chatStep => ({
        text: chatStep.key,
        type: 'option',
      }))
    }
    return Object.keys(data.logs).map(text => ({ type: 'option', text }))
  },
}

const logs = {
  list: [],
  hackathon: false,
  client: null,
  init({ data, client, hackathon }) {
    this.list = []
    this.hackathon = hackathon
    this.data = data
    this.client = client
    chatOptions.reset()
    this.load({ text: 'default' })
  },
  load(option) {
    chatOptions.load({ option, data: this.data, hackathon: this.hackathon })
    const messages = this.findMessages(option)
    const messageLogs = messages.map(message => ({ type: 'message', message }))
    this.add(messageLogs)
    this.afterFetch(option)
  },
  findMessages(option) {
    if (this.hackathon) {
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
