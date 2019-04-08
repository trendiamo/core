import React from 'react'
import { compose, onlyUpdateForKeys } from 'recompose'
import { Prompt as RouterPrompt } from 'react-router'

const defaultMessage = 'You have unsaved changes, are you sure you want to leave?'

const Prompt = ({ message, ...props }) => <RouterPrompt message={message ? message : defaultMessage} {...props} />

export default compose(onlyUpdateForKeys(['message', 'when']))(Prompt)
