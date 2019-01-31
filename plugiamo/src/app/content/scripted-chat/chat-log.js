import { gql } from 'ext/recompose/graphql'

const STEP_DELAY = 250

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
        actionType
        destinationChatStep {
          id
        }
      }
    }
  }
`

const processChatOptions = chatOptions => {
  const account = localStorage.getItem('trnd-plugin-account')
  return chatOptions.filter(chatOption => {
    return !(
      account === 'Impressorajato' &&
      chatOption.actionType !== 'simple' &&
      !document.querySelector('#livechat-compact-container')
    )
  })
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
  addNextLog(logs, timestampParam) {
    const [nextLog, ...otherLogs] = logs
    nextLog.nextLogs = otherLogs
    setTimeout(() => this.addLog(nextLog, timestampParam), STEP_DELAY)
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
        const options = processChatOptions(data.chatStep.chatOptions)
        const optionsLog = { options, type: 'options' }
        const logs = [...messageLogs, optionsLog]
        this.addNextLog(logs, this.timestamp)
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
  selectOption(log, option) {
    log.selected = true
    option.selected = true
    this.listeners.forEach(fn => fn(this))
  },
  timestamp: null,
}

export default chatLog
