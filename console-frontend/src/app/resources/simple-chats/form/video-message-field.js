import React, { useCallback } from 'react'
import { Field } from 'shared/form-elements'
import { youtubeRegexp } from 'utils'

const youtubeInputProps = { pattern: youtubeRegexp }

const VideoMessageField = ({ isFormLoading, name, onChange, onFocus, simpleChatMessageIndex, textObject }) => {
  const onValueChange = useCallback(
    event => {
      onChange({ text: event.target.value || '' }, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex]
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
      value={textObject.text || ''}
    />
  )
}

export default VideoMessageField
