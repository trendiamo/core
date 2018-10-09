import { gql } from 'ext/recompose/graphql'

const STEP_DELAY = 250

const query = gql`
  query($id: ID!) {
    chatStep(where: { id: $id }) {
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

const finalOptions = () => [
  {
    id: 'reset',
    text: 'I still need help',
  },
  {
    id: 'stop',
    text: "I'm done",
  },
]

const chatLog = {
  addListener(fn) {
    this.listeners.push(fn)
  },
  addLog(log) {
    this.logs.push(log)
    this.listeners.forEach(fn => fn(this))
  },
  addNextLog(logs) {
    const [nextLog, ...otherLogs] = logs
    nextLog.nextLogs = otherLogs
    setTimeout(() => this.addLog(nextLog), STEP_DELAY)
  },
  client: null,
  fetchStep(id) {
    this.client
      .request(query, { id })
      .then(data => {
        const messageLogs = data.chatStep.chatMessages.map(message => ({
          from: this.personName,
          message,
          type: 'message',
        }))
        const options = data.chatStep.chatOptions.length > 0 ? data.chatStep.chatOptions : finalOptions()
        const optionsLog = { options, type: 'options' }
        const logs = [...messageLogs, optionsLog]
        this.addNextLog(logs)
      })
      .catch(data => console.error(data))
  },
  init(client, personName) {
    this.listeners = []
    this.logs = []
    this.client = client
    this.personName = personName
  },
  listeners: [],
  logs: [], // logs are messages 'from promoter' and options from end-user. They have a type:'message' or type:'options'
  personName: null,
  removeListener(fn) {
    this.listeners = this.listeners.filter(e => e !== fn)
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
}

export default chatLog
