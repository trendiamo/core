import React, { useCallback } from 'react'
import { Field } from 'shared/form-elements'

const ProductMessagesForm = ({ textObject, onFormChange, isFormLoading, onFocus }) => {
  return (
    <>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Title"
        margin="normal"
        name="title"
        onChange={onFormChange}
        onFocus={onFocus}
        required
        value={textObject.title || ''}
      />
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Picture Url"
        margin="normal"
        name="picUrl"
        onChange={onFormChange}
        onFocus={onFocus}
        required
        value={textObject.picUrl || ''}
      />
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Url"
        margin="normal"
        name="url"
        onChange={onFormChange}
        onFocus={onFocus}
        required
        value={textObject.url || ''}
      />
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Display Price"
        margin="normal"
        name="displayPrice"
        onChange={onFormChange}
        onFocus={onFocus}
        required
        value={textObject.displayPrice || ''}
      />
    </>
  )
}

const ProductMessageFields = ({ textObject, onChange, simpleChatMessageIndex, isFormLoading, onFocus }) => {
  const onFormChange = useCallback(
    event => {
      let newTextObject = { ...textObject, [event.target.name]: event.target.value }
      onChange(newTextObject, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex, textObject]
  )

  return (
    <ProductMessagesForm
      isFormLoading={isFormLoading}
      onFocus={onFocus}
      onFormChange={onFormChange}
      textObject={textObject}
    />
  )
}

export default ProductMessageFields
