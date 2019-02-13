import chatLog from './chat-log'
import { ChatMessage as ChatMessageBase, scrollToInPlugin } from './shared'
import { compose, lifecycle } from 'recompose'

const ChatMessage = compose(
  lifecycle({
    componentDidMount() {
      const { log } = this.props
      if (
        document.activeElement &&
        document.activeElement.tagName.toLowerCase() === 'iframe' &&
        document.activeElement.title === 'Trendiamo Content'
      ) {
        scrollToInPlugin(this.base)
      }
      const timestamp = chatLog.timestamp
      setTimeout(() => {
        chatLog.addNextLog(log.nextLogs, timestamp)
        log.timestamp = Date.now()
      }, log.message.delay)
    },
  })
)(ChatMessageBase)

export default ChatMessage
