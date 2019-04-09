import LauncherBubbleFrame from './launcher-bubble-frame'
import mixpanel from 'ext/mixpanel'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { bubbleExtraDefault, defaultBubble } from './config'
import { ChatBubbleBase, Container } from './components'
import { emojify, timeout } from 'plugin-base'
import { h } from 'preact'

const LauncherBubbleBase = ({
  position,
  disappear,
  bubble,
  animation,
  setTextWidthRef,
  textWidth,
  optimizelyToggleContent,
  ...props
}) => (
  <LauncherBubbleFrame
    animation={animation}
    bubble={bubble}
    disappear={disappear}
    position={position}
    textWidth={textWidth}
    {...props}
  >
    <Container onClick={optimizelyToggleContent}>
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
  withProps(({ bubble, extraBubble }) => ({
    bubble: { ...(extraBubble ? bubbleExtraDefault : defaultBubble), ...bubble },
  })),
  withProps(({ extraBubble }) => ({
    bubbleTimeoutId: `chatBubble${extraBubble && 'Extra'}`,
  })),
  withHandlers(() => {
    let textWidthRef
    return {
      setTextWidthRef: () => ref => (textWidthRef = ref),
      changeTextWidth: ({ setTextWidth }) => () => {
        if (!textWidthRef || !textWidthRef.base) return
        setTextWidth(textWidthRef.base.offsetWidth)
        textWidthRef.base.style.transform = `translate(-${Math.floor(textWidthRef.base.offsetWidth / 2)}px, 0)`
        textWidthRef.base.style.opacity = 1
      },
    }
  }),
  withHandlers({
    reset: ({ setTimeEnded, setAnimation, setTextWidth, setElevation, bubbleTimeoutId }) => () => {
      setTimeEnded(false)
      setAnimation(null)
      setTextWidth(0)
      setElevation(false)
      timeout.clear(bubbleTimeoutId)
    },
    optimizelyToggleContent: ({ onToggleContent, config, showingContent }) => () => {
      if (process.env.production && config.optimizelyClientInstance && !showingContent) {
        config.optimizelyClientInstance.track('openLauncher', mixpanel.get_distinct_id())
      }
      onToggleContent()
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
    }) => () => {
      if (!bubble.message) return false
      reset()
      timeout.set(
        bubbleTimeoutId,
        () => {
          setAnimation('roll')
          changeTextWidth()
        },
        bubble.timeStart * 1000
      )
      if (bubble.timeEnd != null)
        timeout.set(
          bubbleTimeoutId,
          () => {
            setAnimation('unroll')
          },
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd) * 1000
        )
      if (bubble.timeOfElevation != null) {
        timeout.set(
          bubbleTimeoutId,
          () => {
            setElevation(true)
          },
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeOfElevation) * 1000
        )
      }
      if (bubble.timeEnd != null)
        timeout.set(
          bubbleTimeoutId,
          () => {
            setTimeEnded(true)
          },
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
      const { animateThis, showingContent, hiddenForContent, setHiddenForContent } = this.props
      if (prevProps.bubble.message !== this.props.bubble.message) animateThis()
      if (showingContent && !hiddenForContent) setHiddenForContent(true)
      if (!showingContent && hiddenForContent) {
        animateThis()
        setHiddenForContent(false)
      }
    },
  }),
  branch(({ hiddenForContent, bubble, timeEnded }) => !bubble.message || hiddenForContent || timeEnded, renderNothing)
)(LauncherBubbleBase)

export default LauncherBubble
