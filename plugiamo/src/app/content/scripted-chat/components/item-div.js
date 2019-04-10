import autoScroll from 'ext/auto-scroll'
import ChatMessage from './message'
import ChatOption from './option'
import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { h } from 'preact'
import { isFrameActive, MESSAGE_INTERVAL, MESSAGE_RANDOMIZER } from 'app/content/scripted-chat/shared'

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

const ItemDivTemplate = ({ logSection, onClick, hide, hideAll, onMessageClick, nothingSelected }) => (
  <Container>
    {logSection.logs.map((log, index) =>
      log.type === 'message' ? (
        <ChatMessage
          hideAll={hideAll}
          index={index}
          log={log}
          nothingSelected={nothingSelected}
          onMessageClick={onMessageClick}
        />
      ) : log.type === 'option' ? (
        <ChatOption animate={logSection.animate} chatOption={log} hide={hide} index={index} onClick={onClick} />
      ) : null
    )}
  </Container>
)

export default compose(
  withState('hide', 'setHide', false),
  withHandlers({
    onClick: ({ clickChatOption, setHide }) => chatOption => {
      clickChatOption(chatOption)
      setHide(true)
    },
    onMessageClick: ({ assessmentOptions, setHideAll }) => option => {
      assessmentOptions.goToNextStep(option)
      if (!assessmentOptions.step.multiple) setHideAll(true)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { contentRef, logSection, callback, dontScroll } = this.props
      if (logSection.type === 'message') {
        if (isFrameActive() && !dontScroll) {
          autoScroll.activate({ element: contentRef().base, destination: () => this.base.offsetTop - 15, delay: 600 })
        }
        if (callback) {
          setTimeout(() => {
            callback()
          }, MESSAGE_INTERVAL * logSection.logs.length + MESSAGE_RANDOMIZER)
        }
      }
    },
  })
)(ItemDivTemplate)
