import ChatBubbleFrame from './frame'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container, TextBar, TextWidthMeasure } from './components'
import { h } from 'preact'
import { typeText } from 'plugin-base'

// All time values are in seconds
const defaultBubble = {
  timeStart: 0.5,
  timeEnd: 20,
  typingSpeed: 0.04,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
  hideBarAfter: 3,
  startTypingAfter: 0.135,
}

const ChatBubble = ({
  position,
  bubble,
  message,
  animation,
  bar,
  setTextWidthRef,
  textWidth,
  onToggleContent,
  ...props
}) => (
  <ChatBubbleFrame animation={animation} bubble={bubble} position={position} textWidth={textWidth} {...props}>
    <Container onClick={onToggleContent}>
      <ChatBubbleBase animation={animation} bubble={bubble}>
        {message}
      </ChatBubbleBase>
      {bar && <TextBar />}
      <TextWidthMeasure ref={setTextWidthRef}>{bubble.message}</TextWidthMeasure>
    </Container>
  </ChatBubbleFrame>
)

export default compose(
  withState('animation', 'setAnimation', null),
  withState('message', 'setMessage', ''),
  withState('bar', 'setBar', false),
  withState('textWidth', 'setTextWidth', 0),
  withState('elevation', 'setElevation', false),
  withProps(({ bubble }) => ({
    bubble: { ...defaultBubble, ...bubble },
  })),
  withHandlers({
    writeText: ({ bubble, setMessage, setBar }) => ({ that }) => {
      typeText({
        addMessage: text => {
          setMessage(that.props.message + text)
        },
        speed: bubble.typingSpeed,
        callback: () =>
          setTimeout(() => {
            setBar(false)
          }, bubble.hideBarAfter * 1000),
        textReference: bubble.message,
      })
    },
  }),
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
  lifecycle({
    componentDidMount() {
      const { setAnimation, bubble, writeText, changeTextWidth, setBar, setElevation } = this.props
      if (!bubble.message) return false
      const timeStart = bubble.timeStart * 1000
      const timeEnd = bubble.timeEnd * 1000
      const startTypingAfter = bubble.startTypingAfter * 1000
      const timeStartDuration = bubble.timeStartDuration * 1000
      const timeEndDuration = bubble.timeEndDuration * 1000
      const timeOfElevation = bubble.timeOfElevation && bubble.timeOfElevation * 1000
      setTimeout(() => {
        setAnimation('roll')
        changeTextWidth()
      }, timeStart)
      setTimeout(() => {
        setBar(true)
      }, timeStart + timeStartDuration)
      setTimeout(() => {
        writeText({ that: this })
      }, timeStart + timeStartDuration + startTypingAfter)
      setTimeout(() => {
        const { animation } = this.props
        if (animation === 'roll') setAnimation('unroll')
      }, timeStart + timeStartDuration + timeEnd)
      setTimeout(() => {
        setAnimation(null)
      }, timeStart + timeStartDuration + timeEnd + timeEndDuration)
      if (timeOfElevation) {
        setTimeout(() => {
          setElevation(true)
        }, timeStart + timeStartDuration + timeOfElevation)
      }
    },
    componentDidUpdate() {
      const { showingContent, setAnimation, animation } = this.props
      if (showingContent && animation) {
        setAnimation(null)
      }
    },
  }),
  branch(({ showingContent, bubble }) => !bubble.message || showingContent, renderNothing)
)(ChatBubble)
