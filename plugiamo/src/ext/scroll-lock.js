import styled from 'styled-components'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'
import { h } from 'preact'

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

// Do a "scroll lock" which prevents ios-chrome and ios-safari from scrolling the webpage underneath. It doesn't work in
// android-chrome or android-browser sadly, nor does it work in macos-safari. In macos-chrome and macos-firefox this is
// not needed, as we're covered by the `overflow-scroll` css property.
const ScrollLock = compose(
  withProps({
    isEnabled: isIos(),
  }),
  withHandlers(() => {
    let containerRef
    let elementRef
    return {
      setContainerRef: () => ref => (containerRef = ref),
      setElementRef: () => ref => (elementRef = ref),
      setInitialScroll: ({ isEnabled }) => () => {
        if (isEnabled) containerRef.scrollTop = PADDING_TOP
        if (!isEnabled && window.innerWidth < 600) {
          document.body.style.overflow = 'hidden'
        }
      },
      handleScroll: ({ isEnabled, onScroll }) => event => {
        if (event.target.scrollTop <= (isEnabled ? PADDING_TOP : 0)) {
          if (isEnabled) event.target.scrollTop = PADDING_TOP
          return onScroll ? onScroll(event, { at: 'top' }) : { at: 'top' }
        }
        const limit = elementRef.clientHeight - event.target.clientHeight + (isEnabled ? PADDING_TOP : 0)
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
)(({ children, handleScroll, isEnabled, setContainerRef, setElementRef }) => (
  <ScrollContainer onScroll={handleScroll} ref={setContainerRef}>
    {isEnabled ? (
      <ScrollPadding>
        <ScrollElement ref={setElementRef}>{children}</ScrollElement>
      </ScrollPadding>
    ) : (
      <ScrollElement ref={setElementRef}>{children}</ScrollElement>
    )}
  </ScrollContainer>
))

export default ScrollLock
