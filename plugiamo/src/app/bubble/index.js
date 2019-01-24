import ChatBubbleFrame from './frame'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { ChatBubbleBase, Container, TextBar, TextWidthMeasure } from './components'
import { h } from 'preact'

// All time values are in seconds
const defaultBubble = {
  message: 'Hi, welcome to Trendiamo!',
  timeStart: 0.5,
  timeEnd: 20,
  typingSpeed: 0.04,
  timeStartDuration: 0.4,
  timeEndDuration: 0.4,
  hideBarAfter: 3,
  startTypingAfter: 0.135,
}

const ChatBubble = ({ position, bubble, message, animation, bar, setTextWidthRef, textWidth, ...props }) => (
  <ChatBubbleFrame animation={animation} bubble={bubble} position={position} textWidth={textWidth} {...props}>
    <Container>
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
  withProps(({ bubble }) => ({
    bubble: { ...defaultBubble, ...bubble },
  })),
  withHandlers({
    writeText: ({ bubble, setMessage, setBar }) => ({ that }) => {
      return new Promise(function(resolve) {
        var messageArray = bubble.message.split('')
        var currentLetter = 0
        var typingSpeed = bubble.typingSpeed * 1000
        setInterval(function() {
          const { message } = that.props
          if (currentLetter < messageArray.length) {
            setMessage(message + messageArray[currentLetter++])
          } else {
            resolve()
            setTimeout(() => {
              setBar(false)
            }, bubble.hideBarAfter * 1000)
          }
        }, typingSpeed)
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
      const { setAnimation, bubble, writeText, changeTextWidth, setBar } = this.props
      if (!bubble.message) return false
      const timeStart = bubble.timeStart * 1000
      const timeEnd = bubble.timeEnd * 1000
      const startTypingAfter = bubble.startTypingAfter * 1000
      const timeStartDuration = bubble.timeStartDuration * 1000
      const timeEndDuration = bubble.timeEndDuration * 1000
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
