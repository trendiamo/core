import React, { useCallback } from 'react'
import { Field } from 'shared/form-elements'
import { youtubeRegexp } from 'utils'

const youtubeInputProps = { pattern: youtubeRegexp }

const VideoMessageField = ({ isFormLoading, name, onChange, onFocus, simpleChatMessage, simpleChatMessageIndex }) => {
  const onValueChange = useCallback(
    event => {
      const name = event.target.name.replace('simpleChatMessage_', '')
      onChange(Object.assign({}, simpleChatMessage, { [name]: event.target.value }), simpleChatMessageIndex)
    },
    [onChange, simpleChatMessage, simpleChatMessageIndex]
  )

  return (
    <Field
      disabled={isFormLoading}
      fullWidth
      inputProps={youtubeInputProps}
      label="YouTube URL"
      margin="none"
      name={name}
      onChange={onValueChange}
      onFocus={onFocus}
      placeholder="Paste your video URL here"
      required
      value={simpleChatMessage.text}
    />
  )
}

export default VideoMessageField
