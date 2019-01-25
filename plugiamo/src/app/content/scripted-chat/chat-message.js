import chatLog from './chat-log'
import { ChatMessage as ChatMessageBase, scrollToInPlugin } from './shared'
import { compose, lifecycle, withState } from 'recompose'

const ChatMessage = compose(
  withState('isMessageShown', 'setIsMessageShown', false),
  lifecycle({
    componentDidMount() {
      const { log, setIsMessageShown } = this.props
      scrollToInPlugin(this.base)
      const timestamp = chatLog.timestamp
      setTimeout(() => {
        setIsMessageShown(true)
        chatLog.addNextLog(log.nextLogs, timestamp)
        log.timestamp = Date.now()
        scrollToInPlugin(this.base)
      }, log.message.delay)
    },
  })
)(ChatMessageBase)

export default ChatMessage
