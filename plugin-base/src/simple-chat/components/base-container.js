import React from 'react'
import styled from 'styled-components'
import { autoScroll } from 'ext'
import { compose, withHandlers } from 'recompose'

const ContainerDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  background-color: #ebeef2;
  transition: opacity 1s ease-out;
  ${({ animateOpacity }) => animateOpacity && 'opacity: 0;'}
  @keyframes _frekkls_message_appear {
    0% {
      opacity: 0;
      transform: translate(-20px, 0);
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes _frekkls_option_hide {
    0% {
      opacity: 1;
    }
    40% {
      visibility: hidden;
      transform: translateX(20px);
      max-height: 60px;
      opacity: 0;
    }
    100% {
      max-height: 0;
      visibility: hidden;
      opacity: 0;
    }
  }
`

const Container = ({ handleWheel, handleTouch, children, animateOpacity }) => (
  <ContainerDiv animateOpacity={animateOpacity} onTouchMove={handleTouch} onWheel={handleWheel}>
    {children}
  </ContainerDiv>
)

export default compose(
  withHandlers({
    handleWheel: ({ contentRef }) => event => {
      autoScroll.stop()
      const content = contentRef()
      const delta = event.deltaY || event.detail || event.wheelDelta

      if (delta < 0 && content.scrollTop == 0) {
        event.preventDefault()
      }

      if (delta > 0 && content.scrollHeight - content.clientHeight - content.scrollTop <= 1) {
        event.preventDefault()
      }
    },
    handleTouch: () => () => {
      autoScroll.stop()
    },
  })
)(Container)
