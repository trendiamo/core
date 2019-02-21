import chatLog from './chat-log'
import ImgCarouselMessage from './image-carousel-message'
import mixpanel from 'ext/mixpanel'
import ProductCarouselMessage from './product-carousel-message'
import ProductMessage from './product-message'
import scrollToInPlugin from 'ext/scroll-it'
import snarkdown from 'snarkdown'
import styled from 'styled-components'
import TextMessage from 'app/content/scripted-chat/text-message'
import VideoMessage from 'app/content/scripted-chat/video-message'
import { ChatBackground } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { emojify } from 'plugin-base'
import { h } from 'preact'

const extractYoutubeId = message => {
  const regExp = /^\S*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|\?v=)([^#&?]*).*/
  const match = message.match(regExp)
  return match && match[2].length === 11 && match[2]
}

const ChatMessageContainer = styled.div`
  max-width: ${({ chatMessage }) =>
    ['productCarousel', 'imageCarousel'].includes(chatMessage.type) ? 'auto' : '260px'};
  transition: all 0.3s ease-out;
  ${({ show }) =>
    !show &&
    `
    opacity: 0;
    transform: translate(-20px, 0);
  `}
`

const isFrameActive = () => {
  return (
    document.activeElement &&
    document.activeElement.tagName.toLowerCase() === 'iframe' &&
    document.activeElement.title === 'Trendiamo Content'
  )
}

const MESSAGE_INTERVAL = 320
const MESSAGE_RANDOMIZER = 320

const ChatMessage = compose(
  withState('show', 'setShow', false),
  lifecycle({
    componentDidMount() {
      const { setShow, index } = this.props
      setTimeout(() => {
        setShow(true)
      }, index * MESSAGE_INTERVAL + Math.floor(Math.random() + MESSAGE_RANDOMIZER))
    },
  })
)(({ log, show }) => (
  <ChatMessageContainer chatMessage={log.chatMessage} show={show}>
    {log.chatMessage.type === 'text' ? (
      <TextMessage dangerouslySetInnerHTML={{ __html: emojify(snarkdown(log.chatMessage.text)) }} />
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
      onClick: ({ chatOption, onClick, hide }) => () => {
        mixpanel.track('Clicked Option', { hostname: location.hostname, text: chatOption.text })
        if (!chatOption.expanded && !hide) onClick(chatOption)
      },
    })
  )(({ chatOption, className, onClick }) => (
    <div className={className}>
      <ChatOptionText
        dangerouslySetInnerHTML={{ __html: emojify(chatOption.text) }}
        expanded={chatOption.expanded}
        onClick={onClick}
      />
    </div>
  ))
)`
  max-width: 260px;
  text-align: right;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'none' : 'translateY(20px)')};
  transition: opacity 0.4s, transform 0.4s;
  margin-left: auto;
  & + div {
    ${ChatOptionText} {
      margin-top: 5px;
    }
  }
  ${({ hide }) =>
    hide &&
    ` animation: _frekkls_option_hide 0.5s;
      animation-fill-mode: forwards;
  `}
  @keyframes _frekkls_option_hide {
    0% {
      opacity: 1;
    }
    30% {
      visibility: hidden;
      transform: translateX(20px);
      max-height: 60px;
      opacity: 0;
    }
    100% {
      max-height: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
`

const convertLogs = logs => {
  let newLog = []
  let currentList = []
  logs.map((log, index) => {
    const nextLog = logs[index + 1]
    currentList.push(log)
    if (nextLog) {
      if (nextLog.type !== log.type) {
        newLog.push({ ...log, logs: currentList })
        currentList = []
      }
      return
    }
    newLog.push({ ...log, logs: currentList })
  })
  return newLog
}

const ItemDivTemplate = styled.div`
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
  }),
  lifecycle({
    componentDidMount() {
      const { contentRef, logSection, callback } = this.props
      if (logSection.type === 'message') {
        if (isFrameActive()) {
          setTimeout(() => {
            scrollToInPlugin(contentRef, this.base.offsetTop - 15)
          }, 600)
        }
        if (callback) {
          setTimeout(() => {
            callback()
          }, MESSAGE_INTERVAL * logSection.logs.length + MESSAGE_RANDOMIZER)
        }
      }
    },
  })
)(({ logSection, onClick, hide }) => (
  <ItemDivTemplate hide={hide}>
    {logSection.logs.map((log, index) =>
      log.type === 'message' ? (
        <ChatMessage index={index} log={log} />
      ) : log.type === 'option' ? (
        <ChatOption animate={log.animate} chatOption={log.chatOption} hide={log.hide} index={index} onClick={onClick} />
      ) : null
    )}
  </ItemDivTemplate>
))

const ChatLogUi = compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
  withHandlers({
    updateChatLog: ({ setLogs }) => chatLog => {
      setLogs(convertLogs(chatLog.logs))
    },
  }),
  withHandlers(() => {
    let backgroundRef
    return {
      setContentRef: ({ setContentRef }) => ref => {
        setContentRef(ref)
      },
      setBackgroundRef: () => ref => (backgroundRef = ref),
      getBackgroundRef: () => () => backgroundRef,
    }
  }),
  withHandlers({
    configMinHeight: ({ setMinHeight, getBackgroundRef, minHeight }) => () => {
      if (getBackgroundRef().base.clientHeight !== minHeight) {
        setMinHeight(getBackgroundRef().base.clientHeight)
      }
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
    animateNewOptions: ({ logs, setLogs }) => () => {
      const newOptions = logs[logs.length - 1]
      if (newOptions && newOptions.type === 'option') {
        logs[logs.length - 1].logs.map(log => {
          log.animate = true
        })
        setLogs(logs)
      }
    },
    clickChatOption: ({ logs, setLogs, configMinHeight }) => chatOption => {
      chatOption.expanded = true
      let unexpandedChatOptions = []
      let newLogs = []
      logs.map(logSection => {
        logSection.logs
          .map(log => {
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
          .filter(e => e)
      })
      chatLog.setLogs(newLogs)
      setLogs(convertLogs(newLogs))
      chatLog.addLogs(chatOption.chatMessages, unexpandedChatOptions)
      configMinHeight()
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
  })
)(
  ({
    className,
    clickChatOption,
    logs,
    onScroll,
    setContentRef,
    contentRef,
    animateNewOptions,
    setBackgroundRef,
    touch,
    minHeight,
  }) => (
    <div className={className} onScroll={onScroll} ref={setContentRef} touch={touch}>
      <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
        {logs.map((logSection, index) => (
          /* eslint-disable react/no-array-index-key */
          <ItemDiv
            callback={logSection.type === 'message' && animateNewOptions}
            clickChatOption={clickChatOption}
            contentRef={contentRef}
            key={index}
            logSection={logSection}
          />
        ))}
      </ChatBackground>
    </div>
  )
)

export default styled(ChatLogUi)`
  flex-grow: 1;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: ${({ touch }) => (touch ? 'touch' : 'auto')};
  position: relative;

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
