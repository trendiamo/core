import Chat from 'app/content/scripted-chat/components/chat'
import chatLog from './chat-log'
import ItemDiv from 'app/content/scripted-chat/components/item-div'
import { ChatBackground, convertLogs } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'

const ChatLogUiTemplate = ({
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
  <Chat onScroll={onScroll} ref={setContentRef} touch={touch}>
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
  </Chat>
)

export default compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
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
    updateLogs: ({ setLogs }) => chatLog => setLogs(convertLogs(chatLog.logs)),
  }),
  withHandlers({
    initChatLog: ({ module, updateLogs }) => () => {
      chatLog.init(module)
      // we don't remove this listener in componentWillUnmount because preact doesn't fire it inside iframes
      // instead we do a check for chatLog.timestamp in the chatLog logic, to prevent duplicates
      chatLog.addListener(updateLogs)
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
)(ChatLogUiTemplate)
