import chatLog from './chat-log'
import ChatMessage from './chat-message'
import ChatOptions from './chat-options'
import { h } from 'preact'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatLogUi = compose(
  withState('logs', 'setLogs', []),
  withHandlers({
    onResetChat: ({ initialChatStep }) => () => {
      chatLog.resetLogs()
      chatLog.fetchStep(initialChatStep.id)
    },
    updateLogs: ({ setLogs }) => chatLog => setLogs(chatLog.logs),
  }),
  lifecycle({
    componentDidMount() {
      const { client, initialChatStep, personName, updateLogs } = this.props
      chatLog.init(client, personName)
      chatLog.addListener(updateLogs)
      chatLog.fetchStep(initialChatStep.id)
    },
    componentWillUnmount() {
      const { updateLogs } = this.props
      chatLog.removeListener(updateLogs)
    },
  })
)(({ logs, onResetChat, onToggleContent }) => (
  <FlexDiv>
    {logs.map(
      log =>
        log.type === 'message' ? (
          <ChatMessage log={log} />
        ) : (
          <ChatOptions log={log} onResetChat={onResetChat} onStopChat={onToggleContent} />
        )
    )}
  </FlexDiv>
))

export default ChatLogUi
