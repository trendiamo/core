import { convertLogs, listeners, logSectionsToLogs } from 'tools'

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
      return data.simpleChat.simpleChatSteps.map((chatStep, index) => ({
        index,
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
    if (messages) {
      const messageLogs = messages.map(message => ({ type: 'message', relatedOption: option, message }))
      this.add(messageLogs)
    }
    this.afterFetch(option)
  },
  detectOptionChanges({ data }) {
    const dataSteps = data.simpleChat.simpleChatSteps
    const sourceDataSteps = this.data.simpleChat.simpleChatSteps
    const changes = []
    dataSteps.forEach((dataStep, index) => {
      if (sourceDataSteps[index] && sourceDataSteps[index].key !== dataStep.key) {
        changes.push({ ...dataStep, index })
      }
    })
    if (changes.length !== 1) {
      return changes.length > 1 && 'reload'
    }
    this.list = this.list.map(listItem => {
      if (listItem.type === 'option' && listItem.index === changes[0].index) {
        listItem.text = changes[0].key
        return listItem
      }
      return listItem
    })
  },
  checkForNewMessages({ data }) {
    this.data.simpleChat.simpleChatSteps.forEach((item, index) => {
      const sourceDataItem = data.simpleChat.simpleChatSteps[index]
      if (item.simpleChatMessages === undefined && sourceDataItem.simpleChatMessages) {
        const foundOption = chatOptions.get().find(option => option.index === index)
        if (foundOption) return
        this.data = data
        this.load({ index, text: sourceDataItem.key, type: 'option' })
      }
    })
  },
  replaceMessagesInSections({ data, logSections }) {
    // We replace all messages in each message section in order to show all changes in real-time in admin preview
    return logSections.map(logSection => {
      if (logSection.type === 'message') {
        const sourceData = data.simpleChat.simpleChatSteps.find((item, index) => {
          return index === (logSection.relatedOption.index || 0)
        })
        if (!sourceData) return logSection
        logSection.logs = sourceData.simpleChatMessages.map(sourceItem => ({
          type: 'message',
          relatedOption: logSection.relatedOption,
          message: sourceItem,
        }))
      }
      return logSection
    })
  },
  update({ data, setChatDataChanged, callbacks }) {
    if (data.simpleChat.simpleChatSteps.length !== this.data.simpleChat.simpleChatSteps.length) {
      setChatDataChanged(true)
      this.init({ data, callbacks })
      return true
    }

    const changeType = this.detectOptionChanges({ data })
    if (changeType === 'reload') {
      setChatDataChanged(true)
      return this.init({ data, callbacks })
    }

    this.checkForNewMessages({ data })

    // It's easier to replace messages by splitting them into sections and then re-convert to this.list structure below
    let logSections = convertLogs(this.list)
    logSections = this.replaceMessagesInSections({ data, logSections })
    const newLogs = logSectionsToLogs(logSections)

    this.list = newLogs
    listeners.fireAll({ data: this.list })
    this.data = data
    return
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
  update(props) {
    listeners.reset(props.listeners)
    logs.update(props)
  },
  selectOption(option) {
    logs.load(option)
  },
}

export default chatLog
