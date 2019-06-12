import chatLog from 'simple-chat/chat-log'
import ChatLogSection from './chat-log-section'
import isEqual from 'lodash.isequal'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { convertLogs } from 'tools'
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
  const [previousData, setPreviousData] = useState(null)
  const [previousStoreLog, setPreviousStoreLog] = useState(null)
  const [logs, setLogs] = useState([])
  const [chatDataChanged, setChatDataChanged] = useState(false)

  const clickActionsExist = useMemo(() => !!clickActions, [clickActions])
  const title = useMemo(() => data.simpleChat && data.simpleChat.title, [data.simpleChat])

  const updateLogs = useCallback(({ data }) => setLogs(convertLogs(data)), [])

  const defaultInitChatLog = useCallback(
    ({ chatLog, update, updateLogs }) => {
      const chatLogProps = {
        data,
        listeners: [updateLogs],
        callbacks: chatLogCallbacks,
        setChatDataChanged,
      }
      if (update) {
        chatLog.update(chatLogProps)
      } else {
        chatLog.init(chatLogProps)
      }
    },
    [chatLogCallbacks, data]
  )

  const newInitChatLog = useCallback(
    ({ update }) => {
      if (initChatLog) {
        // this is used from plugiamo
        return initChatLog({ chatLog, setLogs, update, updateLogs })
      } else {
        // this is used from admin
        return defaultInitChatLog({ chatLog, update, updateLogs })
      }
    },
    [defaultInitChatLog, initChatLog, updateLogs]
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
      if (isEqual(previousData, data)) return
      if (previousData && handleDataUpdate) {
        handleDataUpdate({ chatLog, setLogs, updateLogs })
      } else {
        newInitChatLog({ update: !!previousData })
      }
    },
    [chatLogCallbacks, data, handleDataUpdate, initChatLog, newInitChatLog, previousData, updateLogs]
  )

  useEffect(
    () => {
      if (
        (!previousStoreLog || !previousStoreLog.logs || previousStoreLog.logs.length === 0) &&
        storeLog &&
        storeLog.logs.length > 0
      ) {
        handleLogsUpdate && handleLogsUpdate({ chatLog, setLogs, updateLogs })
      }
    },
    [handleLogsUpdate, previousStoreLog, storeLog, updateLogs]
  )

  useEffect(
    () => {
      setPreviousData(data)
    },
    [data]
  )

  useEffect(
    () => {
      setPreviousStoreLog(storeLog)
    },
    [storeLog]
  )

  useEffect(
    () => {
      if (!lazyLoadActive) return
      newInitChatLog({ update: false })
      setLazyLoadActive(false)
    },
    [lazyLoadActive, newInitChatLog, setLazyLoadActive]
  )

  useEffect(
    () => {
      if (!chatDataChanged) return
      resetMinHeight()
      setChatDataChanged(false)
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
