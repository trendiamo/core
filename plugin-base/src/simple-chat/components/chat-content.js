import chatLog from 'simple-chat/chat-log'
import ChatLogSection from './chat-log-section'
import isEqual from 'lodash.isequal'
import React from 'react'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { convertLogs } from 'tools'
import { timeout } from 'ext'
import { Title } from 'shared'

export default compose(
  withState('logs', 'setLogs', []),
  withState('chatDataChanged', 'setChatDataChanged', false),
  withProps(({ clickActions }) => ({ clickActionsExist: !!clickActions })),
  withProps(({ data }) => ({
    title: data.simpleChat && data.simpleChat.title,
  })),
  withHandlers({
    updateLogs: ({ setLogs }) => ({ data }) => setLogs(convertLogs(data)),
  }),
  withHandlers({
    initChatLog: ({ data, initChatLog, chatLogCallbacks, setChatDataChanged, setLogs, updateLogs }) => (args = {}) => {
      if (initChatLog) return initChatLog({ ...args, chatLog, setLogs, updateLogs })
      const chatLogProps = {
        data,
        listeners: [updateLogs],
        callbacks: chatLogCallbacks,
        setChatDataChanged,
      }
      if (args.update) {
        chatLog.update(chatLogProps)
      } else {
        timeout.set('chatLogInit', () => chatLog.init(chatLogProps), 0)
      }
    },
  }),
  withHandlers({
    onClick: ({ handleClick, onStopChat, configMinHeight, persona, clickActions, data }) => ({ type, item }) => {
      const handled = handleClick && handleClick({ type, item })
      if (handled) return

      clickActions && clickActions[type]({ item, persona, flowType: data && data.flowType })
      if (type !== 'clickChatOption') return

      configMinHeight()

      if (item.id === 'stop') {
        onStopChat()
      } else {
        chatLog.selectOption(item)
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
        chatDataChanged,
        data,
        handleUpdate,
        initChatLog,
        lazyLoadActive,
        resetMinHeight,
        setChatDataChanged,
        setLazyLoadActive,
      } = this.props
      const handled = handleUpdate && handleUpdate(this.props, prevProps, chatLog)
      if (handled) return
      if (!isEqual(prevProps.data, data)) {
        timeout.set('updateChatLog', () => initChatLog({ update: true }), 0)
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
)(
  ({
    logs,
    title,
    contentRef,
    messageFactory,
    getMessageMaxWidthByType,
    getMessageShowByType,
    hideAll,
    onClick,
    chatDataChanged,
    clickActionsExist,
  }) => (
    <div>
      {title && <Title>{title}</Title>}
      {logs.map((logSection, index) => (
        /* eslint-disable react/no-array-index-key */
        <ChatLogSection
          chatDataChanged={chatDataChanged && index === logs.length - 1}
          clickActionsExist={clickActionsExist}
          contentRef={contentRef}
          getMessageMaxWidthByType={getMessageMaxWidthByType}
          getMessageShowByType={getMessageShowByType}
          hideAll={hideAll}
          index={index}
          key={index}
          logSection={logSection}
          messageFactory={messageFactory}
          onClick={onClick}
          previousLogs={index > 0 && logs[index - 1]}
        />
      ))}
    </div>
  )
)
