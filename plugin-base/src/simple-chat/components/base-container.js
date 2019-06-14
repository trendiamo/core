import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { autoScroll } from 'ext'

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

const Container = ({ children, contentRef, animateOpacity }) => {
  const ref = useRef()
  const handleWheel = useCallback(
    event => {
      autoScroll.stop()
      const delta = event.deltaY || event.detail || event.wheelDelta

      if (delta < 0 && contentRef.current.scrollTop == 0) {
        event.preventDefault()
      }

      if (
        delta > 0 &&
        contentRef.current.scrollHeight - contentRef.current.clientHeight - contentRef.current.scrollTop <= 1
      ) {
        event.preventDefault()
      }
    },
    [contentRef]
  )

  useEffect(
    () => {
      const element = ref.current
      element.addEventListener('wheel', handleWheel)
      return () => {
        element.removeEventListener('wheel', handleWheel)
      }
    },
    [handleWheel]
  )

  return (
    <ContainerDiv animateOpacity={animateOpacity} onTouchMove={autoScroll.stop} ref={ref}>
      {children}
    </ContainerDiv>
  )
}

export default Container
