import chatLog from './chat-log'
import mixpanel from 'ext/mixpanel'
import { ChatOptions as ChatOptionsBase, scrollToInPlugin } from './shared'
import { compose, lifecycle, withHandlers } from 'recompose'
import { location } from 'config'

const ChatOptions = compose(
  lifecycle({
    componentDidMount() {
      scrollToInPlugin(this.base)
    },
  }),
  withHandlers({
    onOptionClick: ({ log, onResetChat, onStopChat, persona }) => chatOption => {
      mixpanel.track('Clicked Chat Option', {
        flowType: 'scriptedChat',
        hostname: location.hostname,
        personaName: persona.name,
        personaRef: persona.id,
        chatOptionText: chatOption.text,
      })
      if (log.selected) return
      chatLog.selectOption(log, chatOption)
      if (chatOption.actionType === 'stop') {
        onStopChat()
      } else if (chatOption.actionType === 'reset') {
        onResetChat()
      } else if (chatOption.destinationChatStep) {
        chatLog.fetchStep(chatOption.destinationChatStep.id)
      } else {
        console.error('No destination chat step for option', chatOption)
      }
    },
  })
)(ChatOptionsBase)

export default ChatOptions
