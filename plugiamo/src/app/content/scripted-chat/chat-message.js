import chatLog from './chat-log'
import { ChatMessage as ChatMessageBase } from './shared'
import { compose, lifecycle, withState } from 'recompose'

const ChatMessage = compose(
  withState('isMessageShown', 'setIsMessageShown', false),
  lifecycle({
    componentDidMount() {
      const { log, setIsMessageShown } = this.props
      setTimeout(() => {
        this.base.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 120)
      const timestamp = chatLog.timestamp
      setTimeout(() => {
        setIsMessageShown(true)
        chatLog.addNextLog(log.nextLogs, timestamp)
        log.timestamp = Date.now()
        setTimeout(() => {
          this.base.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }, 120)
      }, log.message.delay)
    },
  })
)(ChatMessageBase)

export default ChatMessage
