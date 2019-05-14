import chatLog from 'simple-chat/chat-log'
import ChatLogSection from './chat-log-section'
import React from 'react'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { convertLogs } from 'tools'
import { isEqual } from 'lodash'
import { timeout } from 'ext'
import { Title } from 'shared'

export default compose(
  withState('countOfRows', 'setCountOfRows', 6),
  withState('logs', 'setLogs', []),
  withState('isStore', 'setIsStore', false),
  withState('hideAll', 'setHideAll', false),
  withState('chatDataChanged', 'setChatDataChanged', false),
  withProps(({ assessment, bridge }) => ({ specialFlow: assessment || bridge })),
  withProps(({ data, specialFlow }) => ({
    initialChatStep: !specialFlow && data.simpleChat.simpleChatSteps.find(e => e.key === 'default'),
    title: !specialFlow && data.simpleChat.title,
  })),
  withHandlers({
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  }),
  withHandlers({
    initChatLog: ({
      data,
      updateLogs,
      products,
      setCountOfRows,
      countOfRows,
      specialFlow,
      lazyLoadingCount,
      chatLogCallbacks,
      isStore,
      storeLog,
      setIsStore,
      setLogs,
      setHideAll,
      assessment,
      setChatDataChanged,
    }) => (isAssessmentUpdate, update) => {
      if (isAssessmentUpdate) {
        setHideAll(false)
        if (isStore) {
          setIsStore(false)
        }
        if (!isStore && storeLog && storeLog.logs) return setIsStore(true) || setLogs([storeLog])
        setLogs([])
      }
      let compiledData = data
      if (lazyLoadingCount) {
        setCountOfRows(countOfRows + lazyLoadingCount)
        let assessmentProducts = [...products.assessmentProducts]
        assessmentProducts.splice(countOfRows)
        compiledData = {
          ...data,
          logs: {
            default: [...data.logs.default, { type: 'assessmentProducts', assessmentProducts }],
          },
        }
      }
      const props = {
        data: compiledData,
        listeners: [updateLogs],
        specialFlow,
        callbacks: chatLogCallbacks,
        setChatDataChanged,
      }
      if (!isAssessmentUpdate && update) {
        return chatLog.update(props)
      }
      timeout.set('chatLogInit', () => (assessment ? data.logs : true) && chatLog.init(props), 0)
    },
  }),
  withHandlers({
    onClick: ({
      onStopChat,
      configMinHeight,
      persona,
      clickActions,
      data,
      updateLogs,
      setChatDataChanged,
      specialFlow,
    }) => ({ type, item }) => {
      if (type === 'clickChatOption') {
        clickActions && clickActions.clickChatOption({ item, persona, flowType: data && data.flowType })
        configMinHeight()
        return item.id === 'stop'
          ? onStopChat()
          : chatLog.selectOption(item) ||
              (!specialFlow && chatLog.update({ data, listeners: [updateLogs], setChatDataChanged }))
      } else {
        clickActions && clickActions[type]({ item, persona, flowType: data && data.flowType })
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initChatLog } = this.props
      initChatLog()
    },
    componentDidUpdate(prevProps) {
      const {
        data,
        specialFlow,
        lazyLoadActive,
        setLazyLoadActive,
        initChatLog,
        setHideAll,
        chatDataChanged,
        setChatDataChanged,
        resetMinHeight,
      } = this.props
      if (!isEqual(prevProps.data, data)) {
        if (specialFlow) setHideAll(true)
        return timeout.set('assessmentNextStep', () => initChatLog(specialFlow, true), specialFlow ? 800 : 0)
      }
      if (lazyLoadActive && lazyLoadActive !== prevProps.lazyLoadActive) {
        setTimeout(initChatLog, 5)
        setLazyLoadActive(false)
      }
      if (chatDataChanged) {
        resetMinHeight()
        timeout.set('resetChatDataChanged', () => setChatDataChanged(false), 5)
      }
    },
  })
)(({ assessmentOptions, logs, title, contentRef, hideAll, setHideAll, onClick, chatDataChanged }) => (
  <div>
    {title && <Title>{title}</Title>}
    {logs.map((logSection, index) => (
      /* eslint-disable react/no-array-index-key */
      <ChatLogSection
        assessmentOptions={assessmentOptions}
        chatDataChanged={chatDataChanged && index === logs.length - 1}
        contentRef={contentRef}
        hideAll={hideAll}
        index={index}
        key={index}
        logSection={logSection}
        onClick={onClick}
        previousLogs={index > 0 && logs[index - 1]}
        setHideAll={setHideAll}
      />
    ))}
  </div>
))
