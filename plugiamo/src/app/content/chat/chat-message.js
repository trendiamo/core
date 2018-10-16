import chatLog from './chat-log'
import { ChatMessage as ChatMessageBase } from './shared'
import { compose, lifecycle, withState } from 'recompose'

const ChatMessage = compose(
  withState('isMessageShown', 'setIsMessageShown', false),
  lifecycle({
    componentDidMount() {
      const { log, setIsMessageShown } = this.props
      requestAnimationFrame(() => {
        this.base.scrollIntoView({ behavior: 'smooth' })
      })
      const timestamp = chatLog.timestamp
      setTimeout(() => {
        setIsMessageShown(true)
        chatLog.addNextLog(log.nextLogs, timestamp)
        log.timestamp = Date.now()
        requestAnimationFrame(() => {
          this.base.scrollIntoView({ behavior: 'smooth' })
        })
      }, log.message.delay)
    },
  })
)(ChatMessageBase)

export default ChatMessage
