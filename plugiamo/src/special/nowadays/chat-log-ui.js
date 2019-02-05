import chatLog from './chat-log'
import ImgCarouselMessage from './carousel'
import ProductMessage from './product-message'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import TextMessage from 'app/content/scripted-chat/text-message'
import VideoMessage from 'app/content/scripted-chat/video-message'
import { ChatBackground, scrollToInPlugin } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

const ChatMessageContainer = styled.div`
  width: ${({ chatMessage }) => (chatMessage.type === 'imageCarousel' ? 'auto' : '260px')};
`

const ChatMessage = compose(
  lifecycle({
    componentDidMount() {
      scrollToInPlugin(this.base)
    },
  })
)(({ chatMessage }) => (
  <ChatMessageContainer chatMessage={chatMessage}>
    {chatMessage.type === 'text' ? (
      <TextMessage dangerouslySetInnerHTML={{ __html: snarkdown(chatMessage.text) }} />
    ) : chatMessage.type === 'videoUrl' ? (
      <VideoMessage youtubeId={extractYoutubeId(chatMessage.videoUrl)} />
    ) : chatMessage.type === 'product' ? (
      <ProductMessage product={chatMessage.product} />
    ) : chatMessage.type === 'imageCarousel' ? (
      <ImgCarouselMessage imageCarousel={chatMessage.imageCarousel} />
    ) : null}
  </ChatMessageContainer>
))

const ChatOptionText = styled.button.attrs({
  type: 'button',
})`
  font-family: Roboto, sans-serif;
  appearance: none;
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #2f2f2f;
  background: ${({ expanded }) => (expanded ? '#000' : '#fff')};
  color: ${({ expanded }) => (expanded ? '#fff' : '#000')};
  cursor: ${({ expanded }) => (expanded ? 'default' : 'pointer')};
  outline: 0;
  font-size: 14px;
`

const ChatOption = styled(
  compose(
    withHandlers({
      onClick: ({ chatOption, onClick }) => () => {
        if (!chatOption.expanded) onClick(chatOption)
      },
    }),
    lifecycle({
      componentDidMount() {
        scrollToInPlugin(this.base)
      },
    })
  )(({ chatOption, className, onClick }) => (
    <div className={className}>
      <ChatOptionText expanded={chatOption.expanded} onClick={onClick}>
        {chatOption.text}
      </ChatOptionText>
    </div>
  ))
)`
  max-width: 260px;
  align-self: flex-end;
  text-align: right;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatLogUi = compose(
  withState('logs', 'setLogs', []),
  withHandlers({
    updateChatLog: ({ setLogs }) => chatLog => setLogs(chatLog.logs),
  }),
  withHandlers({
    initChatLog: ({ module, updateChatLog }) => () => {
      chatLog.init(module)
      // we don't remove this listener in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do a check for chatLog.timestamp in the chatLog logic, to prevent duplicates
      chatLog.addListener(updateChatLog)
      chatLog.run()
    },
    clickChatOption: ({ logs, setLogs }) => chatOption => {
      chatOption.expanded = true
      let unexpandedChatOptions = []
      const newLogs = logs
        .map(log => {
          if (log.type === 'option' && chatOption.text === log.chatOption.text) {
            return { ...log, expanded: true }
          }
          if (log.type === 'option' && !log.chatOption.expanded) {
            unexpandedChatOptions.push(log.chatOption)
            return null
          }
          return log
        })
        .filter(e => e)
      chatLog.setLogs(newLogs)
      setLogs(newLogs)
      chatLog.addChatMessages(chatOption.chatMessages, unexpandedChatOptions)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
  })
)(({ className, clickChatOption, logs }) => (
  <ChatBackground className={className}>
    <ChatContainer>
      {logs.map(log =>
        log.type === 'message' ? (
          <ChatMessage chatMessage={log.chatMessage} />
        ) : log.type === 'option' ? (
          <ChatOption chatOption={log.chatOption} onClick={clickChatOption} />
        ) : null
      )}
    </ChatContainer>
  </ChatBackground>
))

export default styled(ChatLogUi)`
  margin-bottom: 56px;
  @media (min-height: 500px) {
    margin-bottom: 0;
  }

  ${ChatMessageContainer} + ${ChatOption} {
    padding-top: 2rem;
  }

  ${ChatOption} + ${ChatMessageContainer} {
    padding-top: 10px;
  }

  ${ChatOption} + ${ChatOption},
  ${ChatMessageContainer} + ${ChatMessageContainer} {
    padding-top: 5px;
  }

  ${ChatContainer} > :last-child {
    padding-bottom: 16px;
  }
`
