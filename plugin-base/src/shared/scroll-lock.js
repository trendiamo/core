import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { isIos } from 'tools'

const PADDING_TOP = 1
const PADDING_BOTTOM = 1

const ScrollPadding = styled.div`
  padding-top: ${PADDING_TOP}px;
  padding-bottom: ${PADDING_BOTTOM}px;
  min-height: 100%;
  flex: 1;
`

const ScrollContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const ScrollElement = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const isEnabled = isIos()

const ScrollLock = ({ children, onScroll }) => {
  const containerRef = useRef()
  const elementRef = useRef()

  const setInitialScroll = useCallback(() => {
    if (isEnabled) containerRef.current.scrollTop = PADDING_TOP
  }, [])

  const handleScroll = useCallback(
    event => {
      if (event.target.scrollTop <= (isEnabled ? PADDING_TOP : 0)) {
        if (isEnabled) event.target.scrollTop = PADDING_TOP
        return onScroll ? onScroll(event, { at: 'top' }) : { at: 'top' }
      }
      const limit = elementRef.current.clientHeight - event.target.clientHeight + (isEnabled ? PADDING_TOP : 0)
      if (event.target.scrollTop >= limit) {
        if (isEnabled) event.target.scrollTop = limit
        return onScroll ? onScroll(event, { at: 'bottom' }) : { at: 'bottom' }
      }
      return onScroll ? onScroll(event, { at: 'middle' }) : { at: 'middle' }
    },
    [onScroll]
  )

  useEffect(setInitialScroll, [])

  return (
    <ScrollContainer onScroll={handleScroll} ref={containerRef}>
      {isEnabled ? (
        <ScrollPadding>
          <ScrollElement ref={elementRef}>{children}</ScrollElement>
        </ScrollPadding>
      ) : (
        <ScrollElement ref={elementRef}>{children}</ScrollElement>
      )}
    </ScrollContainer>
  )
}

// Do a "scroll lock" which prevents ios-chrome and ios-safari from scrolling the webpage underneath. It doesn't work in
// android-chrome or android-browser sadly, nor does it work in macos-safari. In macos-chrome and macos-firefox this is
// not needed, as we're covered by the `overflow-scroll` css property.
export default ScrollLock
