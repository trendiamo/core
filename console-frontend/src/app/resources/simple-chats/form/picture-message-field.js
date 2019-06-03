import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const PictureMessageForm = ({
  isCropping,
  isFormLoading,
  progress,
  setIsCropping,
  setPicture,
  setPictureUrl,
  simpleChatMessage,
  onFormChange,
}) => (
  <>
    <PictureUploader
      disabled={isCropping}
      label="Picture"
      name="picUrl"
      onChange={setPictureUrl}
      required
      setDisabled={setIsCropping}
      setPic={setPicture}
      value={simpleChatMessage.picUrl || ''}
    />
    {progress && <ProgressBar progress={progress} />}
    <FormControlLabel
      control={
        <Checkbox
          checked={simpleChatMessage.groupWithAdjacent}
          color="primary"
          name="groupWithAdjacent"
          onChange={onFormChange}
        />
      }
      disabled={isFormLoading}
      label="Group with adjacent"
    />
  </>
)

const PictureMessageField = ({
  onChange,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
  const [progress, setProgress] = useState(null)

  const onFormChange = useCallback(
    event => {
      const isCheckbox = event.target.type === 'checkbox'
      const newSimpleChatMessage = {
        ...simpleChatMessage,
        [event.target.name]: isCheckbox ? event.target.checked : event.target.value,
      }
      onChange(newSimpleChatMessage, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex, simpleChatMessage]
  )

  const setPicture = useCallback(
    blob => {
      setSimpleChatMessagePicture(simpleChatMessageIndex, blob, setProgress)
    },
    [setSimpleChatMessagePicture, simpleChatMessageIndex]
  )

  const setPictureUrl = useCallback(picUrl => onChange({ ...simpleChatMessage, picUrl }, simpleChatMessageIndex), [
    onChange,
    simpleChatMessage,
    simpleChatMessageIndex,
  ])

  return (
    <PictureMessageForm
      onFormChange={onFormChange}
      progress={progress}
      setIsCropping={setIsCropping}
      setPicture={setPicture}
      setPictureUrl={setPictureUrl}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default PictureMessageField
