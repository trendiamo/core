import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'

const ProductMessagesForm = ({
  isCropping,
  isFormLoading,
  onFocus,
  onFormChange,
  progress,
  setIsCropping,
  simpleChatMessage,
  setPicture,
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

const ProductMessageFields = ({
  isFormLoading,
  onChange,
  onFocus,
  setIsCropping,
  simpleChatMessage,
  simpleChatMessageIndex,
}) => {
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
    picture => {
      onFocus()
      onChange({ ...simpleChatMessage, ...picture }, simpleChatMessageIndex)
    },
    [onChange, onFocus, simpleChatMessage, simpleChatMessageIndex]
  )

  return (
    <ProductMessagesForm
      isFormLoading={isFormLoading}
      onFocus={onFocus}
      onFormChange={onFormChange}
      setIsCropping={setIsCropping}
      setPicture={setPicture}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default ProductMessageFields
