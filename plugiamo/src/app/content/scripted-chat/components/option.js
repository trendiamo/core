import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { emojify } from 'plugin-base'
import { h } from 'preact'

const ChatOptionText = styled.div`
  appearance: none;
  outline: 0;
  margin: 0;
  padding: 8px 15px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  font-weight: ${({ expanded }) => (expanded ? 'normal' : '500')};
  background: ${({ expanded }) => (expanded ? '#222' : '#fff')};
  color: ${({ expanded }) => (expanded ? '#fff' : '#222')};
  cursor: ${({ expanded }) => (expanded ? 'default' : 'pointer')};
  font-size: 14px;
  line-height: 1.4;
`

const Container = styled.div`
  max-width: 260px;
  text-align: right;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  opacity: ${({ animate }) => (animate ? 1 : 0)};
  transform: ${({ animate }) => (animate ? 'none' : 'translateY(20px)')};
  transition: opacity 0.4s, transform 0.4s;
  margin-left: auto;
  & + div {
    div {
      margin-top: 5px;
    }
  }
  ${({ hide, expanded }) =>
    hide &&
    !expanded &&
    ` animation: _frekkls_option_hide 0.5s;
      animation-fill-mode: forwards;
  `}
`

const ChatOption = ({ chatOption, onClick, animate, hide }) => (
  <Container animate={animate} expanded={chatOption.expanded} hide={hide}>
    <ChatOptionText
      dangerouslySetInnerHTML={{ __html: emojify(chatOption.text) }}
      expanded={chatOption.expanded}
      onClick={onClick}
    />
  </Container>
)

export default compose(
  withState('clicked', 'setClicked', false),
  withHandlers({
    onClick: ({ chatOption, onClick, hide }) => () => {
      if (!chatOption.expanded && !hide) onClick(chatOption)
    },
  })
)(ChatOption)
