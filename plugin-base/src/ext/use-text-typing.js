import runes from 'ext/runes'
import { timeout } from 'ext'
import { useEffect, useReducer } from 'react'

const typeText = ({ appendText, finalText, speed }) => {
  const messageArray = runes(finalText)
  let index = 0
  timeout.set(
    'textTypingInterval',
    () => {
      if (index < messageArray.length) {
        appendText(messageArray[index++])
      } else {
        timeout.clear('textTypingInterval', true)
      }
    },
    speed * 1000,
    true
  )
}

const useTextTyping = (finalText, delay = 0) => {
  const [currentText, dispatch] = useReducer((currentText, action) => {
    if (action.type === 'reset') {
      return ''
    } else if (action.type === 'append') {
      return currentText + action.text
    } else {
      throw new Error()
    }
  }, '')

  useEffect(
    () => () => {
      timeout.clear('textTyping')
      timeout.clear('textTypingInterval', true)
    },
    []
  )

  useEffect(() => {
    timeout.clear('textTyping')
    timeout.clear('textTypingInterval', true)
    dispatch({ type: 'reset' })
    const appendText = text => dispatch({ type: 'append', text })
    timeout.set('textTyping', () => typeText({ appendText, speed: 0.01, finalText }), delay)
  }, [delay, dispatch, finalText])

  return currentText
}

export default useTextTyping
