import i18n from 'ext/i18n'
import { gql } from 'ext/recompose/graphql'

const query = gql`
  query($id: ID!) {
    chatStep(id: $id) {
      chatMessages {
        id
        delay
        text
      }
      chatOptions {
        id
        text
        destinationChatStep {
          id
        }
      }
    }
  }
`

const finalOptions = () => {
  const account = localStorage.getItem('trnd-plugin-account')
  if (account === 'Impressorajato' && !document.querySelector('#livechat-compact-container')) {
    return []
  }
  return [
    {
      id: 'stop',
      text: i18n.okCool(),
    },
  ]
}

const processChatOptions = chatOptions => {
  const account = localStorage.getItem('trnd-plugin-account')
  if (account === 'Impressorajato' && document.querySelector('#livechat-compact-container')) {
    return [
      ...chatOptions,
      {
        id: 'stop',
        text: i18n.okCool(),
      },
    ]
  } else {
    return chatOptions
  }
}

const chatLog = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  addLog(log, timestampParam) {
    if (timestampParam !== this.timestamp) return // prevent duplicates if user opens & closes repeatedly and fast
    this.logs.push(log)
    this.listeners.forEach(fn => fn(this))
  },
  client: null,
  fetchStep(id) {
    return this.client
      .request(query, { id })
      .then(data => {
        const messageLogs = data.chatStep.chatMessages.map(message => ({
          from: this.personName,
          message,
          type: 'message',
        }))
        const options =
          data.chatStep.chatOptions.length > 0 ? processChatOptions(data.chatStep.chatOptions) : finalOptions()
        const optionLogs = options.map(chatOption => ({ type: 'option', chatOption }))
        const logs = messageLogs.concat(optionLogs)
        logs.map(log => {
          this.addLog(log, this.timestamp)
        })
      })
      .catch(data => console.error(data))
  },
  init(client, personName) {
    this.timestamp = Date.now()
    this.listeners = []
    this.logs = []
    this.client = client
    this.personName = personName
  },
  listeners: [],
  logs: [], // logs are messages from persona and options from end-user. They have a type:'message' or type:'options'
  personName: null,
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
}

export default chatLog
