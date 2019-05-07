import React from 'react'
import styled from 'styled-components'
import withRef from 'ext/with-ref'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'

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

const isIos = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

const ScrollLockTemplate = ({ children, handleScroll, isEnabled, setContainerRef, setElementRef }) => (
  <ScrollContainer onScroll={handleScroll} ref={setContainerRef}>
    {isEnabled ? (
      <ScrollPadding>
        <ScrollElement ref={setElementRef}>{children}</ScrollElement>
      </ScrollPadding>
    ) : (
      <ScrollElement ref={setElementRef}>{children}</ScrollElement>
    )}
  </ScrollContainer>
)

// Do a "scroll lock" which prevents ios-chrome and ios-safari from scrolling the webpage underneath. It doesn't work in
// android-chrome or android-browser sadly, nor does it work in macos-safari. In macos-chrome and macos-firefox this is
// not needed, as we're covered by the `overflow-scroll` css property.
const ScrollLock = compose(
  withRef('getContainerRef', 'setContainerRef'),
  withRef('getElementRef', 'setElementRef'),
  withProps({
    isEnabled: isIos(),
  }),
  withHandlers(() => {
    return {
      setInitialScroll: ({ isEnabled, getContainerRef }) => () => {
        if (isEnabled) getContainerRef().scrollTop = PADDING_TOP
        if (!isEnabled && window.innerWidth < 600) {
          document.body.style.overflow = 'hidden'
        }
      },
      handleScroll: ({ isEnabled, onScroll, getElementRef }) => event => {
        if (event.target.scrollTop <= (isEnabled ? PADDING_TOP : 0)) {
          if (isEnabled) event.target.scrollTop = PADDING_TOP
          return onScroll ? onScroll(event, { at: 'top' }) : { at: 'top' }
        }
        const limit = getElementRef().clientHeight - event.target.clientHeight + (isEnabled ? PADDING_TOP : 0)
        if (event.target.scrollTop >= limit) {
          if (isEnabled) event.target.scrollTop = limit
          return onScroll ? onScroll(event, { at: 'bottom' }) : { at: 'bottom' }
        }
        return onScroll ? onScroll(event, { at: 'middle' }) : { at: 'middle' }
      },
    }
  }),
  lifecycle({
    componentDidMount() {
      const { setInitialScroll } = this.props
      setInitialScroll()
    },
  })
)(ScrollLockTemplate)

export default ScrollLock
