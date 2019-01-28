import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { timeout } from 'ext'

const typeText = ({ addMessage, textReference, callback, speed }) => {
  var messageArray = textReference.split('')
  var currentLetter = 0
  var typingSpeed = speed * 1000
  timeout.set(
    'personaDescriptionTypingInterval',
    () => {
      if (currentLetter < messageArray.length) {
        addMessage(messageArray[currentLetter++])
      } else {
        callback && callback()
      }
    },
    typingSpeed,
    true
  )
}

export const withTextTyping = (textReference, delay = 0) => Component =>
  compose(
    withState('currentDescription', 'setCurrentDescription', ''),
    withState('currentReference', 'setCurrentReference', ''),
    withHandlers({
      addMessage: ({ currentDescription, setCurrentDescription }) => text => {
        setCurrentDescription(currentDescription + text)
      },
    }),
    withHandlers({
      handleTextTyping: ({ addMessage, setCurrentDescription }) => textReference => {
        timeout.clear('personaDescriptionTyping')
        timeout.clear('personaDescriptionTypingInterval', true)
        setCurrentDescription('')
        timeout.set(
          'personaDescriptionTyping',
          () => {
            typeText({
              addMessage,
              speed: 0.01,
              textReference,
            })
          },
          delay
        )
      },
    }),
    lifecycle({
      componentDidMount() {
        const { handleTextTyping, setCurrentReference } = this.props
        const reference = textReference(this.props)
        handleTextTyping(reference)
        setCurrentReference(reference)
      },
      componentWillUnmount() {
        timeout.clear('personaDescriptionTyping')
        timeout.clear('personaDescriptionTypingInterval', true)
      },
      componentDidUpdate() {
        const { setCurrentReference, currentReference, handleTextTyping } = this.props
        const newReference = textReference(this.props)
        if (currentReference !== newReference) {
          setCurrentReference(newReference)
          handleTextTyping(newReference)
        }
      },
    })
  )(Component)

export default typeText
