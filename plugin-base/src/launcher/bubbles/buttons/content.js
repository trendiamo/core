import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  transition: 2s opacity;
  opacity: ${({ action }) => (action !== 'fadeOut' ? 0 : 1)};
  cursor: pointer;
  animation: ${({ action }) => (action === 'appear' ? '_frekkls_bubble_btn_text_appear 1s' : 'none')};
  animation-delay: ${({ action }) => (action === 'appear' ? 0.5 : 0)}s;
  animation-fill-mode: forwards;
  @keyframes _frekkls_bubble_btn_text_appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const Text = styled.div`
  white-space: nowrap;
  backface-visibility: hidden;
  user-select: none;
  pointer-events: none;
`

const Content = ({ action, clicked, handleClick, button }) => (
  <Container action={action} clicked={clicked} onClick={handleClick(button.value)}>
    <Text>{button.message}</Text>
  </Container>
)
export default Content
