import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { emojify } from 'ext'

const ChatOptionText = styled.div`
  appearance: none;
  outline: 0;
  margin: 0;
  padding: 8px 15px;
  border-radius: 20px;
  border: 2px solid rgba(0, 0, 0, 0.25);
  font-weight: ${({ clicked }) => (clicked ? 'normal' : '500')};
  background: ${({ clicked }) => (clicked ? '#222' : '#fff')};
  color: ${({ clicked }) => (clicked ? '#fff' : '#222')};
  cursor: ${({ clicked }) => (clicked ? 'default' : 'pointer')};
  font-size: 14px;
  line-height: 1.4;
`

const Container = styled.div`
  max-width: 260px;
  text-align: right;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  opacity: ${({ animate, hide }) => (hide || animate ? 1 : 0)};
  transform: ${({ animate, hide }) => (hide || animate ? 'none' : 'translateY(20px)')};
  transition: opacity 0.4s, transform 0.4s;
  margin-left: auto;
  & + div {
    div {
      margin-top: 5px;
    }
  }
  ${({ hide, clicked }) =>
    hide &&
    !clicked &&
    ` animation: _frekkls_option_hide 0.4s;
      animation-fill-mode: forwards;
  `}
`

const ChatOption = ({ chatOption, onClick, animate, hide, clicked }) => (
  <Container animate={animate} clicked={clicked} hide={hide}>
    <ChatOptionText
      clicked={clicked}
      dangerouslySetInnerHTML={{ __html: emojify(chatOption.text) }}
      onClick={onClick}
    />
  </Container>
)

export default compose(
  withState('clicked', 'setClicked', false),
  withHandlers({
    onClick: ({ chatOption, onClick, hide, clicked, setClicked, animate }) => () => {
      if (!clicked && !hide && animate) {
        setClicked(true)
        onClick({ type: 'clickChatOption', item: chatOption })
      }
    },
  })
)(ChatOption)
