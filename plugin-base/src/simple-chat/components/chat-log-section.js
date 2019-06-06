import ChatMessage from './message'
import ChatOption from './option'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import timeout from 'ext/timeout'
import { autoScroll } from 'ext'
import { MESSAGE_INTERVAL, MESSAGE_RANDOMIZER } from 'tools'

const Container = styled.div`
  flex-direction: column;
  display: flex;
  & + & {
    margin-top: 16px;
  }
  &:last-child {
    margin-bottom: 16px;
  }
`

const ChatLogSection = ({
  contentRef,
  chatDataChanged,
  clickActionsExist,
  getMessageMaxWidthByType,
  getMessageShowByType,
  hideAll,
  index,
  logSection,
  messageFactory,
  nothingSelected,
  onClick,
  previousLogs,
}) => {
  const containerRef = useRef()

  const [hide, setHide] = useState(false)
  const [animate, setAnimate] = useState(false)
  const [doneAnimation, setDoneAnimation] = useState(false)

  const newOnClick = useCallback(
    ({ type, item }) => {
      onClick({ type, item })
      setHide(true)
    },
    [onClick]
  )

  useEffect(
    () => () => {
      timeout.clear('chatLogSectionAnimate')
    },
    []
  )

  useEffect(
    () => {
      if (logSection.type !== 'message' || index === 0) return
      autoScroll.activate({
        element: contentRef.current,
        destination: () => containerRef.current.offsetTop - 15,
        delay: 600,
      })
    },
    [contentRef, index, logSection.type]
  )

  useEffect(
    () => {
      if (!previousLogs) return
      const timer = MESSAGE_INTERVAL * previousLogs.logs.length + MESSAGE_RANDOMIZER
      timeout.set('chatLogSectionAnimate', () => setAnimate(true), timer)
    },
    [previousLogs]
  )

  useEffect(
    () => {
      setHide(false)
    },
    [chatDataChanged]
  )

  return (
    <Container ref={containerRef}>
      {logSection.logs.map((log, index) =>
        log.type === 'message' ? (
          /* eslint-disable react/no-array-index-key */
          <ChatMessage
            clickActionsExist={clickActionsExist}
            doneAnimation={doneAnimation}
            getMessageMaxWidthByType={getMessageMaxWidthByType}
            getMessageShowByType={getMessageShowByType}
            hideAll={hideAll}
            index={index}
            isLastMessage={index === logSection.logs.length - 1}
            key={index}
            log={log}
            messageFactory={messageFactory}
            nothingSelected={nothingSelected}
            onClick={newOnClick}
            setDoneAnimation={setDoneAnimation}
          />
        ) : log.type === 'option' ? (
          /* eslint-disable react/no-array-index-key */
          <ChatOption animate={animate} chatOption={log} hide={hide} index={index} key={index} onClick={newOnClick} />
        ) : null
      )}
    </Container>
  )
}

export default ChatLogSection
