import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'

const PictureMessageForm = ({
  isCropping,
  isFormLoading,
  progress,
  setIsCropping,
  setPicture,
  simpleChatMessage,
  onFormChange,
}) => (
  <>
    <PictureUploader
      aspectRatio={1}
      disabled={isCropping}
      label="Picture"
      name="picUrl"
      onChange={setPicture}
      required
      setDisabled={setIsCropping}
      value={{ picUrl: simpleChatMessage.picUrl, picRect: simpleChatMessage.picRect }}
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

const PictureMessageField = ({ onChange, setIsCropping, simpleChatMessage, simpleChatMessageIndex }) => {
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

  const setPicture = useCallback(picture => onChange({ ...simpleChatMessage, ...picture }, simpleChatMessageIndex), [
    onChange,
    simpleChatMessage,
    simpleChatMessageIndex,
  ])

  return (
    <PictureMessageForm
      onFormChange={onFormChange}
      setIsCropping={setIsCropping}
      setPicture={setPicture}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default PictureMessageField
