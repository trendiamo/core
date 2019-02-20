import ChatBubbleFrame from './frame'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container } from './components'
import { emojify, timeout } from 'plugin-base'
import { h } from 'preact'

// All time values are in seconds
const defaultBubble = {
  timeStart: 0.5,
  timeEnd: 20,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
}

const ChatBubble = ({
  position,
  disappear,
  bubble,
  animation,
  setTextWidthRef,
  textWidth,
  onToggleContent,
  ...props
}) => (
  <ChatBubbleFrame
    animation={animation}
    bubble={bubble}
    disappear={disappear}
    position={position}
    textWidth={textWidth}
    {...props}
  >
    <Container onClick={onToggleContent}>
      <ChatBubbleBase dangerouslySetInnerHTML={{ __html: emojify(bubble.message) }} ref={setTextWidthRef} />
    </Container>
  </ChatBubbleFrame>
)

export default compose(
  withState('hidden', 'setHidden', false),
  withState('animation', 'setAnimation', null),
  withState('textWidth', 'setTextWidth', 0),
  withState('elevation', 'setElevation', false),
  withProps(({ bubble }) => ({
    bubble: { ...defaultBubble, ...bubble },
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
    reset: ({ setHidden, setAnimation, setTextWidth, setElevation, bubbleTimeoutId }) => () => {
      setHidden(false)
      setAnimation(null)
      setTextWidth(0)
      setElevation(false)
      timeout.clear(bubbleTimeoutId)
    },
  }),
  withHandlers({
    animateThis: ({ bubble, bubbleTimeoutId, reset, changeTextWidth, setAnimation, setElevation, setHidden }) => () => {
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
            setHidden(true)
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
      const { animateThis, isUnmounting, showingContent, hidden, setHidden } = this.props
      if (prevProps.bubble.message !== this.props.bubble.message) animateThis()
      if (!isUnmounting && showingContent && !hidden) setHidden(true)
      if (hidden && !showingContent && isUnmounting) {
        animateThis()
        setHidden(false)
      }
    },
  }),
  branch(({ hidden, bubble }) => !bubble.message || hidden, renderNothing)
)(ChatBubble)
