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
      setTimeout(() => {
        setIsMessageShown(true)
        log.timestamp = Date.now()
        chatLog.addNextLog(log.nextLogs)
        requestAnimationFrame(() => {
          this.base.scrollIntoView({ behavior: 'smooth' })
        })
      }, log.message.delay)
    },
  })
)(ChatMessageBase)

export default ChatMessage
