import ChatMessage from './message'
import ChatOption from './option'
import React from 'react'
import styled from 'styled-components'
import withRef from 'ext/with-ref'
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

const ItemDivTemplate = ({ animate, logSection, hide, hideAll, onClick, nothingSelected, setContainerRef }) => (
  <Container ref={setContainerRef}>
    {logSection.logs.map((log, index) =>
      log.type === 'message' ? (
        /* eslint-disable react/no-array-index-key */
        <ChatMessage
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
)

export default compose(
  withState('hide', 'setHide', false),
  withState('animate', 'setAnimate', false),
  withRef('getContainerRef', 'setContainerRef'),
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
      const { contentRef, logSection, previousLogs, setAnimate, index, dontScroll, getContainerRef } = this.props
      if (logSection.type === 'message') {
        if (index > 0 && !dontScroll) {
          autoScroll.activate({
            element: contentRef(),
            destination: () => getContainerRef().offsetTop - 15,
            delay: 600,
          })
        }
      }
      if (previousLogs) {
        setTimeout(() => {
          setAnimate(true)
        }, MESSAGE_INTERVAL * previousLogs.logs.length + MESSAGE_RANDOMIZER)
      }
    },
  })
)(ItemDivTemplate)
