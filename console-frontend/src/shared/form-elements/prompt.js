import React, { memo } from 'react'
import { Prompt as RouterPrompt } from 'react-router'

const defaultMessage = 'You have unsaved changes, are you sure you want to leave?'

const Prompt = ({ message, ...props }) => <RouterPrompt message={message ? message : defaultMessage} {...props} />

export default memo(
  Prompt,
  (prevProps, nextProps) => prevProps.message === nextProps.message && prevProps.when === nextProps.when
)
