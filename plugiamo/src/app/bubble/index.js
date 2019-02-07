import ChatBubbleFrame from './frame'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container, TextWidthMeasure } from './components'
import { h } from 'preact'

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
  withState('animation', 'setAnimation', null),
  withState('textWidth', 'setTextWidth', 0),
  withState('elevation', 'setElevation', false),
  withProps(({ bubble }) => ({
    bubble: { ...defaultBubble, ...bubble },
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
    animateThis: ({ animation, bubble, changeTextWidth, setAnimation, setElevation, setTextWidth }) => () => {
      if (!bubble.message) return false
      setTimeout(() => {
        setAnimation('roll')
        changeTextWidth()
      }, bubble.timeStart * 1000)
      setTimeout(() => {
        if (animation === 'roll') setAnimation('unroll')
      }, (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd) * 1000)
      if (bubble.timeOfElevation) {
        setTimeout(() => {
          setElevation(true)
        }, (bubble.timeStart + bubble.timeStartDuration + bubble.timeOfElevation) * 1000)
      }
      setTimeout(() => {
        setAnimation(null)
        setTextWidth(0)
        setElevation(false)
      }, (bubble.timeStart + bubble.timeStartDuration + bubble.timeEnd + bubble.timeEndDuration) * 1000)
    },
  }),
  lifecycle({
    componentDidMount() {
      const { animateThis } = this.props
      animateThis()
    },
    componentDidUpdate(prevProps) {
      const { animateThis, showingContent, setAnimation, animation } = this.props
      if (prevProps.bubble.message !== this.props.bubble.message) animateThis()
      if (showingContent && animation) setAnimation(null)
    },
  }),
  branch(({ showingContent, bubble }) => !bubble.message || showingContent, renderNothing)
)(ChatBubble)
