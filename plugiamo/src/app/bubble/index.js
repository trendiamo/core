import ChatBubbleFrame from './frame'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container, TextWidthMeasure } from './components'
import { h } from 'preact'
import { timeout } from 'plugin-base'

// All time values are in seconds
const defaultBubble = {
  timeStart: 0.5,
  timeEnd: 20,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
}

const ChatBubble = ({ position, bubble, animation, setTextWidthRef, textWidth, onToggleContent, ...props }) => (
  <ChatBubbleFrame animation={animation} bubble={bubble} position={position} textWidth={textWidth} {...props}>
    <Container onClick={onToggleContent}>
      <ChatBubbleBase animation={animation} bubble={bubble}>
        {bubble.message}
      </ChatBubbleBase>
      <TextWidthMeasure ref={setTextWidthRef}>{bubble.message}</TextWidthMeasure>
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
        if (textWidthRef) {
          setTextWidth(textWidthRef.base.offsetWidth)
        }
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
      timeout.set(
        bubbleTimeoutId,
        () => {
          setAnimation('unroll')
        },
        (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd) * 1000
      )
      if (bubble.timeOfElevation) {
        timeout.set(
          bubbleTimeoutId,
          () => {
            setElevation(true)
          },
          (bubble.timeStart + bubble.timeStartDuration + bubble.timeOfElevation) * 1000
        )
      }
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
      const { animateThis, showingContent, hidden, setHidden } = this.props
      if (prevProps.bubble.message !== this.props.bubble.message) animateThis()
      if (showingContent && !hidden) setHidden(true)
    },
  }),
  branch(({ hidden, bubble }) => !bubble.message || hidden, renderNothing)
)(ChatBubble)
