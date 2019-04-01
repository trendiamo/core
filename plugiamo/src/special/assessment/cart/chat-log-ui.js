import Chat from 'app/content/scripted-chat/components/chat'
import chatLog from 'app/content/scripted-chat/chat-log'
import ItemDiv from 'app/content/scripted-chat/components/item-div'
import { ChatBackground, convertLogs } from 'app/content/scripted-chat/shared'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { recommendedProducts } from 'special/assessment/utils'

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
  withState('countOfRows', 'setCountOfRows', 6),
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
    initChatLog: ({ module, updateLogs, productsData, setCountOfRows, countOfRows }) => numberOfRows => {
      setCountOfRows(countOfRows + numberOfRows)
      let productSuggestions = recommendedProducts(productsData)
      productSuggestions.assessmentProducts.splice(countOfRows)
      const compiledData = {
        ...module,
        logs: { default: [...module.logs.default, productSuggestions] },
      }
      chatLog.init({ data: compiledData, listeners: [updateLogs], hackathon: true })
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
      initChatLog(6)
    },
    componentDidUpdate(prevProps) {
      const { lazyLoad, setLazyLoad, initChatLog } = this.props
      if (lazyLoad && lazyLoad !== prevProps.lazyLoad) {
        setTimeout(() => initChatLog(6), 5)
        setLazyLoad(false)
      }
    },
  })
)(ChatLogUiTemplate)
