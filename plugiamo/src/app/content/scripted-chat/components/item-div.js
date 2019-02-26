import ChatMessage from './message'
import ChatOption from './option'
import scrollToInPlugin from 'ext/scroll-it'
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

const ItemDivTemplate = ({ logSection, onClick, hide }) => (
  <Container>
    {logSection.logs.map((log, index) =>
      log.type === 'message' ? (
        <ChatMessage index={index} log={log} />
      ) : log.type === 'option' ? (
        <ChatOption animate={log.animate} chatOption={log.chatOption} hide={hide} index={index} onClick={onClick} />
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
  }),
  lifecycle({
    componentDidMount() {
      const { contentRef, logSection, callback } = this.props
      if (logSection.type === 'message') {
        if (isFrameActive()) {
          setTimeout(() => {
            scrollToInPlugin(contentRef().base, this.base.offsetTop - 15)
          }, 600)
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
