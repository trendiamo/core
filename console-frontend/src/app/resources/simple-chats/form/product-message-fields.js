import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'

const ProductMessagesForm = ({
  isCropping,
  isFormLoading,
  onFocus,
  onFormChange,
  progress,
  setIsCropping,
  setPicture,
  setPictureUrl,
  simpleChatMessage,
}) => (
  <>
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Title"
      margin="normal"
      name="title"
      onChange={onFormChange}
      onFocus={onFocus}
      required
      value={simpleChatMessage.title || ''}
    />
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Url"
      margin="normal"
      name="url"
      onChange={onFormChange}
      onFocus={onFocus}
      required
      type="URL"
      value={simpleChatMessage.url || ''}
    />
    <FormHelperText>{'Use the whole url, eg: https://www.example.com/page1'}</FormHelperText>
    <Field
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Display Price"
      margin="normal"
      name="displayPrice"
      onChange={onFormChange}
      onFocus={onFocus}
      required
      value={simpleChatMessage.displayPrice || ''}
    />
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

const ProductMessageFields = ({
  isFormLoading,
  onChange,
  onFocus,
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

  const setPictureUrl = useCallback(
    picUrl => {
      onFocus()
      onChange({ ...simpleChatMessage, picUrl }, simpleChatMessageIndex)
    },
    [onChange, onFocus, simpleChatMessage, simpleChatMessageIndex]
  )

  const setPicture = useCallback(
    blob => {
      setSimpleChatMessagePicture(simpleChatMessageIndex, blob, setProgress)
    },
    [setSimpleChatMessagePicture, simpleChatMessageIndex]
  )

  return (
    <ProductMessagesForm
      isFormLoading={isFormLoading}
      onFocus={onFocus}
      onFormChange={onFormChange}
      progress={progress}
      setIsCropping={setIsCropping}
      setPicture={setPicture}
      setPictureUrl={setPictureUrl}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default ProductMessageFields
