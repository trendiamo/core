import chatLog from 'simple-chat/chat-log'
import ChatLogSection from './chat-log-section'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { convertLogs } from 'tools'
import { timeout } from 'ext'
import { Title } from 'shared'

const ChatContent = ({
  chatLogCallbacks,
  clickActions,
  configMinHeight,
  contentRef,
  data,
  getMessageMaxWidthByType,
  getMessageShowByType,
  handleClick,
  handleDataUpdate,
  handleLogsUpdate,
  hideAll,
  initChatLog,
  lazyLoadActive,
  messageFactory,
  onStopChat,
  persona,
  resetMinHeight,
  setLazyLoadActive,
  storeLog,
}) => {
  const [logs, setLogs] = useState([])
  const [chatDataChanged, setChatDataChanged] = useState(false)

  const clickActionsExist = useMemo(() => !!clickActions, [clickActions])
  const title = useMemo(() => data.simpleChat && data.simpleChat.title, [data.simpleChat])

  const updateLogs = useCallback(({ data }) => setLogs(convertLogs(data)), [])

  const newInitChatLog = useCallback(
    (args = {}) => {
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
    [chatLogCallbacks, data, initChatLog, updateLogs]
  )

  const onClick = useCallback(
    ({ type, item }) => {
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
    [clickActions, configMinHeight, data, handleClick, onStopChat, persona]
  )

  useEffect(
    () => {
      newInitChatLog()
      return () => {
        timeout.clear('chatLogInit')
        timeout.clear('updateChatLog')
        timeout.clear('resetChatDataChanged')
      }
    },
    [newInitChatLog]
  )

  useEffect(
    () => {
      if (storeLog && storeLog.logs.length > 0) {
        handleLogsUpdate && handleLogsUpdate({ chatLog, setLogs, updateLogs })
      }
    },
    [handleLogsUpdate, storeLog, updateLogs]
  )

  useEffect(
    () => {
      const handled = handleDataUpdate && handleDataUpdate({ chatLog, setLogs, updateLogs })
      if (handled) return
      timeout.set('updateChatLog', () => newInitChatLog({ update: true }), 0)
    },
    [data, handleDataUpdate, newInitChatLog, updateLogs]
  )

  useEffect(
    () => {
      if (!lazyLoadActive) return
      setTimeout(newInitChatLog, 5)
      setLazyLoadActive(false)
    },
    [newInitChatLog, lazyLoadActive, setLazyLoadActive]
  )

  useEffect(
    () => {
      if (!chatDataChanged) return
      resetMinHeight()
      timeout.set('resetChatDataChanged', () => setChatDataChanged(false), 5)
    },
    [chatDataChanged, resetMinHeight]
  )

  return (
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
}

export default ChatContent
