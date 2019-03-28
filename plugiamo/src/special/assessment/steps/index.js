import Chat from 'app/content/scripted-chat/components/chat'
import chatLog from 'app/content/scripted-chat/chat-log'
import ItemDiv from 'app/content/scripted-chat/components/item-div'
import { ChatBackground, convertLogs } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { timeout } from 'plugin-base'

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
  assessmentOptions,
  hideAll,
  setHideAll,
}) => (
  <Chat onScroll={onScroll} ref={setContentRef} touch={touch}>
    <ChatBackground ref={setBackgroundRef} style={{ minHeight }}>
      {logs.map((logSection, index) => (
        /* eslint-disable react/no-array-index-key */
        <ItemDiv
          assessmentOptions={assessmentOptions}
          callback={logSection.type === 'message' && animateNewOptions}
          clickChatOption={clickChatOption}
          contentRef={contentRef}
          dontScroll
          hideAll={hideAll}
          key={index}
          logSection={logSection}
          setHideAll={setHideAll}
        />
      ))}
    </ChatBackground>
  </Chat>
)

export default compose(
  withState('logs', 'setLogs', []),
  withState('minHeight', 'setMinHeight', 0),
  withState('hideAll', 'setHideAll', false),
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
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  }),
  withHandlers({
    initChatLog: ({ step, updateLogs }) => () => {
      timeout.set(
        'assessmentNextStep',
        () => {
          if (step.logs) chatLog.init({ data: step, listeners: [updateLogs], hackathon: true })
        },
        0
      )
    },
    animateNewOptions: ({ logs, setLogs }) => () => {
      const newOptions = logs[logs.length - 1]
      if (newOptions && newOptions.type === 'option') {
        logs[logs.length - 1].animate = true
        setLogs(logs)
      }
    },
    clickChatOption: ({ configMinHeight }) => chatOption => {
      chatLog.selectOption(chatOption)
      configMinHeight()
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
    componentDidUpdate(prevProps) {
      const { initChatLog, step, setHideAll, setLogs } = this.props
      if (prevProps.step !== step) {
        setHideAll(true)
        timeout.set(
          'assessmentNextStep',
          () => {
            setLogs([])
            initChatLog()
            setHideAll(false)
          },
          800
        )
      }
    },
  })
)(ChatLogUiTemplate)
