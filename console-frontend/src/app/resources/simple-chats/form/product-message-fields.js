import React, { useCallback } from 'react'
import { Field } from 'shared/form-elements'
import { Grid } from '@material-ui/core'

const ProductMessagesForm = ({ textObject, onFormChange, isFormLoading }) => {
  return (
    <Grid item sm={6}>
      <Field
        disabled={isFormLoading}
        fullWidth
        label="Title"
        margin="normal"
        name="title"
        onChange={onFormChange}
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
        required
        value={textObject.displayPrice || ''}
      />
    </Grid>
  )
}

const ProductMessageFields = ({ textObject, onChange, simpleChatMessageIndex, isFormLoading }) => {
  const onFormChange = useCallback(
    event => {
      let newTextObject = { ...textObject, [event.target.name]: event.target.value }
      onChange(newTextObject, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessageIndex, textObject]
  )

  return <ProductMessagesForm isFormLoading={isFormLoading} onFormChange={onFormChange} textObject={textObject} />
}

export default ProductMessageFields
