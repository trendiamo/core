import chatLog from './chat-log'
import ChatMessage from './chat-message'
import ChatOptions from './chat-options'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { h } from 'preact'

const FlexDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatLogUi = compose(
  withProps(({ persona }) => ({
    personName: persona.name.split(' ')[0],
  })),
  withState('logs', 'setLogs', []),
  withHandlers({
    onResetChat: ({ initialChatStep }) => () => {
      chatLog.resetLogs()
      chatLog.fetchStep(initialChatStep.id)
    },
    onStopChat: ({ onToggleContent }) => () => {
      const account = localStorage.getItem('trnd-plugin-account')
      if (account === 'Impressorajato') {
        onToggleContent()
        const liveChatContainer = document.querySelector('#livechat-compact-container')
        if (liveChatContainer) liveChatContainer.style.visibility = 'visible'
        if (window.LC_API && window.LC_API.open_chat_window) window.LC_API.open_chat_window({ source: 'trendiamo' })
      } else {
        onToggleContent()
      }
    },
    updateLogs: ({ setLogs }) => chatLog => setLogs(chatLog.logs),
  }),
  lifecycle({
    componentDidMount() {
      const { client, initialChatStep, personName, updateLogs } = this.props
      chatLog.init(client, personName)
      // we don't remove this listener in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do a check for chatLog.timestamp in the chatLog logic, to prevent duplicates
      chatLog.addListener(updateLogs)
      chatLog.fetchStep(initialChatStep.id)
    },
  })
)(({ logs, onResetChat, onStopChat, persona }) => (
  <FlexDiv>
    {logs.map(log =>
      log.type === 'message' ? (
        <ChatMessage log={log} />
      ) : (
        <ChatOptions log={log} onResetChat={onResetChat} onStopChat={onStopChat} persona={persona} />
      )
    )}
  </FlexDiv>
))

export default ChatLogUi
