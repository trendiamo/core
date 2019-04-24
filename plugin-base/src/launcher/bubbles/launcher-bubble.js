import LauncherBubbleFrame from './launcher-bubble-frame'
import React from 'react'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container } from './components'
import { emojify, timeout } from 'ext'

const LauncherBubbleBase = ({
  position,
  disappear,
  bubble,
  animation,
  setTextWidthRef,
  textWidth,
  onClick,
  launcherConfig,
  elevation,
  offset,
}) => (
  <LauncherBubbleFrame
    animation={animation}
    bubble={bubble}
    disappear={disappear}
    elevation={elevation}
    launcherConfig={launcherConfig}
    offset={offset}
    position={position}
    textWidth={textWidth}
  >
    <Container onClick={onClick}>
      <ChatBubbleBase dangerouslySetInnerHTML={{ __html: emojify(bubble.message) }} ref={setTextWidthRef} />
    </Container>
  </LauncherBubbleFrame>
)

const LauncherBubble = compose(
  withState('timeEnded', 'setTimeEnded', false),
  withState('hiddenForContent', 'setHiddenForContent', false),
  withState('animation', 'setAnimation', null),
  withState('textWidth', 'setTextWidth', 0),
  withState('elevation', 'setElevation', false),
  withProps(({ extraBubble }) => ({
    bubbleTimeoutId: `chatBubble${extraBubble && 'Extra'}`,
  })),
  withHandlers(() => {
    let textWidthRef
    return {
      setTextWidthRef: () => ref => (textWidthRef = ref && ref.base ? ref : { base: ref }),
      changeTextWidth: ({ setTextWidth }) => () => {
        if (!textWidthRef || !textWidthRef.base) return
        setTextWidth(textWidthRef.base.offsetWidth)
        textWidthRef.base.style.transform = `translate(-${Math.floor(textWidthRef.base.offsetWidth / 2)}px, 0)`
        textWidthRef.base.style.opacity = 1
      },
    }
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
)(LauncherBubbleBase)

export default LauncherBubble
