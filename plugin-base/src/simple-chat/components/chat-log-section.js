import ChatMessage from './message'
import ChatOption from './option'
import React, { useRef } from 'react'
import styled from 'styled-components'
import timeout from 'ext/timeout'
import { autoScroll } from 'ext'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
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

const ChatLogSection = compose(
  withState('hide', 'setHide', false),
  withState('animate', 'setAnimate', false),
  withHandlers({
    onClick: ({ onClick, assessmentOptions, setHide, setHideAll }) => ({ type, item }) => {
      if (type === 'assessmentOption') {
        assessmentOptions.goToNextStep(item)
        if (!assessmentOptions.step.multiple) setHideAll(true)
        return
      }
      onClick({ type, item })
      setHide(true)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { contentRef, logSection, previousLogs, setAnimate, index, dontScroll, containerRef } = this.props
      if (logSection.type === 'message') {
        if (index > 0 && !dontScroll) {
          autoScroll.activate({
            element: contentRef.current,
            destination: () => containerRef.current.offsetTop - 15,
            delay: 600,
          })
        }
      }
      if (previousLogs) {
        timeout.set(
          'chatLogSectionAnimate',
          () => setAnimate(true),
          MESSAGE_INTERVAL * previousLogs.logs.length + MESSAGE_RANDOMIZER
        )
      }
    },
    componentDidUpdate(prevProps) {
      const { hide, setHide, chatDataChanged } = this.props
      if (prevProps.chatDataChanged !== chatDataChanged && hide) {
        setHide(false)
      }
    },
    componentWillUnmount() {
      timeout.clear('chatLogSectionAnimate')
    },
  })
)(({ animate, containerRef, clickActionsExist, logSection, hide, hideAll, onClick, nothingSelected }) => (
  <Container ref={containerRef}>
    {logSection.logs.map((log, index) =>
      log.type === 'message' ? (
        /* eslint-disable react/no-array-index-key */
        <ChatMessage
          clickActionsExist={clickActionsExist}
          hideAll={hideAll}
          index={index}
          key={index}
          log={log}
          nothingSelected={nothingSelected}
          onClick={onClick}
        />
      ) : log.type === 'option' ? (
        /* eslint-disable react/no-array-index-key */
        <ChatOption animate={animate} chatOption={log} hide={hide} index={index} key={index} onClick={onClick} />
      ) : null
    )}
  </Container>
))

const ChatLogSection1 = props => {
  const containerRef = useRef()

  return <ChatLogSection {...props} containerRef={containerRef} />
}

export default ChatLogSection1
