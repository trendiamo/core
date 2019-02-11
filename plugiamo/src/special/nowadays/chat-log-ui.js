import chatLog from './chat-log'
import ImgCarouselMessage from './image-carousel-message'
import mixpanel from 'ext/mixpanel'
import ProductCarouselMessage from './product-carousel-message'
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
  max-width: ${({ chatMessage }) =>
    ['productCarousel', 'imageCarousel'].includes(chatMessage.type) ? 'auto' : '260px'};
`

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
      chatLog.addNextLog(log.nextLogs, timestamp)
      log.timestamp = Date.now()
    },
  })
)(({ log }) => (
  <ChatMessageContainer chatMessage={log.chatMessage}>
    {log.chatMessage.type === 'text' ? (
      <TextMessage dangerouslySetInnerHTML={{ __html: snarkdown(log.chatMessage.text) }} />
    ) : log.chatMessage.type === 'videoUrl' ? (
      <VideoMessage youtubeId={extractYoutubeId(log.chatMessage.videoUrl)} />
    ) : log.chatMessage.type === 'product' ? (
      <ProductMessage product={log.chatMessage.product} />
    ) : log.chatMessage.type === 'productCarousel' ? (
      <ProductCarouselMessage carouselType={log.chatMessage.type} productCarousel={log.chatMessage.productCarousel} />
    ) : log.chatMessage.type === 'imageCarousel' ? (
      <ImgCarouselMessage carouselType={log.chatMessage.type} imageCarousel={log.chatMessage.imageCarousel} />
    ) : null}
  </ChatMessageContainer>
))

const ChatOptionText = styled.button.attrs({
  type: 'button',
})`
  font-family: Roboto, sans-serif;
  appearance: none;
  outline: 0;
  margin: 0;
  padding: 8px 15px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  font-weight: ${({ expanded }) => (expanded ? 'normal' : '500')};
  background: ${({ expanded }) => (expanded ? '#222' : '#fff')};
  color: ${({ expanded }) => (expanded ? '#fff' : '#222')};
  cursor: ${({ expanded }) => (expanded ? 'default' : 'pointer')};
  font-size: 14px;
  line-height: 1.4;
`

const ChatOption = styled(
  compose(
    withHandlers({
      onClick: ({ chatOption, onClick }) => () => {
        mixpanel.track('Clicked Option', { hostname: location.hostname, text: chatOption.text })
        if (!chatOption.expanded) onClick(chatOption)
      },
    }),
    lifecycle({
      componentDidMount() {
        if (
          document.activeElement &&
          document.activeElement.tagName.toLowerCase() === 'iframe' &&
          document.activeElement.title === 'Trendiamo Content'
        ) {
          scrollToInPlugin(this.base)
        }
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
      chatLog.addLogs(chatOption.chatMessages, unexpandedChatOptions)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
  })
)(({ className, clickChatOption, logs }) => (
  <div className={className}>
    <ChatBackground>
      <ChatContainer>
        {logs.map(log =>
          log.type === 'message' ? (
            <ChatMessage log={log} />
          ) : log.type === 'option' ? (
            <ChatOption chatOption={log.chatOption} onClick={clickChatOption} />
          ) : null
        )}
      </ChatContainer>
    </ChatBackground>
  </div>
))

export default styled(ChatLogUi)`
  padding-bottom: 50px;

  @media (min-height: 500px) {
    padding-top: ${({ coverMinimized }) => (coverMinimized ? '90px' : '140px')};
  }

  ${ChatMessageContainer} + ${ChatOption} {
    padding-top: 16px;
  }

  ${ChatOption} + ${ChatMessageContainer} {
    padding-top: 16px;
  }

  ${ChatOption} + ${ChatOption},
  ${ChatMessageContainer} + ${ChatMessageContainer} {
    padding-top: 5px;
  }

  ${ChatContainer} > :last-child {
    padding-bottom: 16px;
  }
`
