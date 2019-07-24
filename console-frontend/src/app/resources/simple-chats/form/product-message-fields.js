import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field, FormHelperText } from 'shared/form-elements'

const ProductMessagesForm = ({
  autoFocus,
  isCropping,
  isFormLoading,
  isNextSameType,
  isPreviousSameType,
  isUploaderLoading,
  onFocus,
  onFormChange,
  progress,
  setIsCropping,
  setIsUploaderLoading,
  setPicture,
  simpleChatMessage,
}) => (
  <>
    <Field
      autoFocus={autoFocus}
      disabled={isCropping || isFormLoading || isUploaderLoading}
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
      disabled={isCropping || isFormLoading || isUploaderLoading}
      fullWidth
      label="URL"
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
      disabled={isCropping || isFormLoading || isUploaderLoading}
      fullWidth
      label="Display Price"
      margin="normal"
      name="displayPrice"
      onChange={onFormChange}
      onFocus={onFocus}
      value={simpleChatMessage.displayPrice || ''}
    />
    <PictureUploader
      disabled={isCropping || isFormLoading || isUploaderLoading}
      label="Picture"
      name="picUrl"
      onChange={setPicture}
      required
      setDisabled={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      value={{ url: simpleChatMessage.picture.url, picRect: simpleChatMessage.picRect }}
    />
    {progress && <ProgressBar progress={progress} />}
    <FormControlLabel
      control={
        <Checkbox
          checked={(isNextSameType || isPreviousSameType) && simpleChatMessage.groupWithAdjacent}
          color="primary"
          disabled={!(isNextSameType || isPreviousSameType)}
          name="groupWithAdjacent"
          onChange={onFormChange}
        />
      }
      disabled={isFormLoading}
      label="Group with neighbouring products"
    />
  </>
)

const ProductMessageFields = ({
  autoFocus,
  isCropping,
  isFormLoading,
  isNextSameType,
  isPreviousSameType,
  isUploaderLoading,
  onChange,
  onFocus,
  setIsCropping,
  setIsUploaderLoading,
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
      onChange(
        { ...simpleChatMessage, picture: { url: picture.url }, picRect: picture.picRect },
        simpleChatMessageIndex
      )
    },
    [onChange, onFocus, simpleChatMessage, simpleChatMessageIndex]
  )

  return (
    <ProductMessagesForm
      autoFocus={autoFocus}
      isCropping={isCropping}
      isFormLoading={isFormLoading}
      isNextSameType={isNextSameType}
      isPreviousSameType={isPreviousSameType}
      isUploaderLoading={isUploaderLoading}
      onFocus={onFocus}
      onFormChange={onFormChange}
      setIsCropping={setIsCropping}
      setIsUploaderLoading={setIsUploaderLoading}
      setPicture={setPicture}
      simpleChatMessage={simpleChatMessage}
    />
  )
}

export default ProductMessageFields
