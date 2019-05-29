import LauncherBubbleFrame from './launcher-bubble-frame'
import React, { useRef } from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container } from './components'
import { timeout } from 'ext'

const LauncherBubble = ({
  animation,
  bubble,
  disappear,
  elevation,
  frameStyleStr,
  launcherConfig,
  offset,
  onClick,
  position,
  textWidth,
  textWidthRef,
}) => (
  <LauncherBubbleFrame
    animation={animation}
    bubble={bubble}
    disappear={disappear}
    elevation={elevation}
    launcherConfig={launcherConfig}
    offset={offset}
    position={position}
    styleStr={frameStyleStr}
    textWidth={textWidth}
  >
    <Container onClick={onClick}>
      <ChatBubbleBase dangerouslySetInnerHTML={{ __html: bubble.message }} ref={textWidthRef} />
    </Container>
  </LauncherBubbleFrame>
)

const LauncherBubble1 = compose(
  withState('timeEnded', 'setTimeEnded', false),
  withState('hiddenForContent', 'setHiddenForContent', false),
  withState('animation', 'setAnimation', null),
  withState('textWidth', 'setTextWidth', 0),
  withState('elevation', 'setElevation', false),
  withProps(({ extraBubble }) => ({
    bubbleTimeoutId: `chatBubble${extraBubble && 'Extra'}`,
  })),
  withHandlers({
    changeTextWidth: ({ setTextWidth, textWidthRef }) => () => {
      if (!textWidthRef.current) return
      setTextWidth(textWidthRef.current.offsetWidth)
      textWidthRef.current.style.transform = `translate(-${Math.floor(textWidthRef.current.offsetWidth / 2)}px, 0)`
      textWidthRef.current.style.opacity = 1
    },
  }),
  withHandlers({
    reset: ({ setTimeEnded, extraBubble, setAnimation, setTextWidth, setElevation, bubbleTimeoutId }) => () => {
      setTimeEnded(false)
      setAnimation(null)
      setTextWidth(0)
      !extraBubble && setElevation(false)
      timeout.clear(bubbleTimeoutId)
    },
    safeAction: ({ showingContent }) => callback => () => {
      if (!showingContent) {
        callback()
      }
    },
  }),
  withHandlers({
    animateThis: ({
      bubble,
      bubbleTimeoutId,
      reset,
      changeTextWidth,
      setAnimation,
      setElevation,
      setTimeEnded,
      bubbleExtraExists,
      safeAction,
    }) => () => {
      if (!bubble.message) return false
      reset()
      timeout.set(
        bubbleTimeoutId,
        safeAction(() => {
          setAnimation('roll')
          changeTextWidth()
        }),
        bubble.timeStart * 1000
      )
      if (bubble.timeEnd != null)
        timeout.set(
          bubbleTimeoutId,
          safeAction(() => {
            setAnimation('unroll')
          }),
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd) * 1000
        )
      if (bubbleExtraExists) {
        timeout.set(
          bubbleTimeoutId,
          safeAction(() => {
            setElevation(true)
          }),
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeOfElevation) * 1000
        )
      }
      if (bubble.timeEnd != null)
        timeout.set(
          bubbleTimeoutId,
          safeAction(() => {
            setTimeEnded(true)
          }),
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd + bubble.timeEndDuration) * 1000
        )
    },
  }),
  lifecycle({
    componentDidMount() {
      const { animateThis } = this.props
      animateThis()
    },
    componentDidUpdate(prevProps) {
      const {
        animateThis,
        showingContent,
        setElevation,
        hiddenForContent,
        setHiddenForContent,
        changeTextWidth,
        setAnimation,
        bubble,
        bubbleExtraExists,
        bubbleButtons,
      } = this.props
      const messageChanged = prevProps.bubble.message !== bubble.message
      if (
        prevProps.bubbleExtraExists !== bubbleExtraExists ||
        (prevProps.bubble.message === '' && messageChanged && bubbleExtraExists)
      ) {
        setTimeout(() => setElevation(bubbleExtraExists), bubbleButtons && !bubbleExtraExists ? 300 : 10)
      }
      if (showingContent && !hiddenForContent) setHiddenForContent(true)
      if (messageChanged) {
        setAnimation('roll')
        setTimeout(changeTextWidth, 10)
      }
      if (!showingContent && hiddenForContent) {
        animateThis()
        setHiddenForContent(false)
      }
    },
  }),
  branch(({ hiddenForContent, bubble, timeEnded }) => !bubble.message || hiddenForContent || timeEnded, renderNothing)
)(LauncherBubble)

const LauncherBubble2 = props => {
  const textWidthRef = useRef()

  return <LauncherBubble1 {...props} textWidthRef={textWidthRef} />
}

export default LauncherBubble2
