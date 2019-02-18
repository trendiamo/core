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
  animation: _frekkls_message_appear 0.3s ease-out;
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
  text-align: right;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  opacity: 1;
  margin-left: auto;
  & + div {
    margin-top: 5px;
  }
  ${({ hide }) =>
    hide &&
    ` animation: _frekkls_option_hide 0.8s;
      animation-fill-mode: forwards;
  `}
  @keyframes _frekkls_option_hide {
    0% {
      opacity: 1;
    }
    50% {
      visibility: hidden;
      transform: translateX(20px);
      max-height: 60px;
      opacity: 0;
    }
    100% {
      max-height: 0px;
      visibility: hidden;
      opacity: 0;
      margin-top: 0;
    }
  }
`

const convertLogs = logs => {
  var newLog = []
  var currentType
  var currentList = []
  logs.map((log, index) => {
    const nextLog = logs[index + 1]
    currentList.push(log)
    currentType = log.type
    if (nextLog) {
      if (nextLog.type !== currentType) {
        newLog.push({ type: currentType, logs: currentList })
        currentList = []
      }
      return
    }
    newLog.push({ type: currentType, logs: currentList })
  })
  return newLog
}

const ItemDivTemplate = styled.div`
  text-align: ${({ type }) => (type === 'option' ? 'right' : 'left')};
  & + & {
    margin-top: 16px;
  }
  &:last-child {
    margin-bottom: 16px;
  }
`

const ItemDiv = compose(
  withState('hide', 'setHide', false),
  withHandlers({
    onClick: ({ clickChatOption, setHide }) => chatOption => {
      clickChatOption(chatOption)
      setHide(true)
    },
  })
)(({ logs, onClick, hide }) => (
  <ItemDivTemplate hide={hide}>
    {logs.map(log =>
      log.type === 'message' ? (
        <ChatMessage log={log} />
      ) : log.type === 'option' ? (
        <ChatOption chatOption={log.chatOption} hide={log.hide} onClick={onClick} />
      ) : null
    )}
  </ItemDivTemplate>
))

const ChatLogUi = compose(
  withState('logs', 'setLogs', []),
  withHandlers({
    updateChatLog: ({ setLogs }) => chatLog => {
      setLogs(convertLogs(chatLog.logs))
    },
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
      let newLogs = []
      logs.map(logSection => {
        logSection.logs.map(log => {
          if (log.hide) return
          if (log.type === 'option' && chatOption.text === log.chatOption.text) {
            return newLogs.push({ ...log, expanded: true })
          }
          if (log.type === 'option' && !log.chatOption.expanded) {
            unexpandedChatOptions.push(log.chatOption)
            return newLogs.push({ ...log, hide: true })
          }
          newLogs.push(log)
        })
      })
      chatLog.setLogs(newLogs)
      setLogs(convertLogs(newLogs))
      chatLog.addLogs(chatOption.chatMessages, unexpandedChatOptions)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
  })
)(({ className, clickChatOption, logs, onScroll, touch }) => (
  <div className={className} onScroll={onScroll} touch={touch}>
    <ChatBackground>
      {logs.map((logSection, index) => (
        <ItemDiv clickChatOption={clickChatOption} key={index} logs={logSection.logs} type={logSection.type} />
      ))}
    </ChatBackground>
  </div>
))

export default styled(ChatLogUi)`
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: ${({ touch }) => (touch ? 'touch' : 'auto')};

  ${ChatMessageContainer} + ${ChatOption} {
    padding-top: 16px;
  }

  ${ChatOption} + ${ChatMessageContainer} {
    padding-top: 16px;
  }

  ${ChatMessageContainer} + ${ChatMessageContainer} {
    padding-top: 5px;
  }
`
