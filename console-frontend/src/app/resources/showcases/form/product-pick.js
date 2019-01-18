import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { DragHandle } from 'shared/sortable-elements'
import { FormHelperText, TextField } from '@material-ui/core'

const ProductPick = ({
  allowDelete,
  deleteProductPick,
  editProductPickValue,
  isCropping,
  isFormLoading,
  index,
  productPick,
  progress,
  onFocus,
  setPicture,
  setIsCropping,
  setPictureUrl,
}) => (
  <FormSection
    actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteProductPick} />}
    backgroundColor="#fff"
    dragHandle={<DragHandle />}
    foldable
    folded
    hideBottom
    hideTop={index === 0}
    title={`Product Pick #${index + 1}`}
  >
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Url"
      margin="normal"
      name="productPick_url"
      onChange={editProductPickValue}
      onFocus={onFocus}
      required
      value={productPick.url}
    />
    <FormHelperText>
      {
        'Use the whole url, eg: https://www.example.com/page1 - you can test it by clicking on the item in the preview. Hint: you can copy/paste links from the URL Generator.'
      }
    </FormHelperText>
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="productPick_name"
      onChange={editProductPickValue}
      onFocus={onFocus}
      required
      value={productPick.name}
    />
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Description"
      margin="normal"
      name="productPick_description"
      onChange={editProductPickValue}
      onFocus={onFocus}
      required
      value={productPick.description}
    />
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Display Price"
      margin="normal"
      name="productPick_displayPrice"
      onChange={editProductPickValue}
      onFocus={onFocus}
      required
      value={productPick.displayPrice}
    />
    <PictureUploader
      disabled={isCropping}
      label="Picture"
      onChange={setPictureUrl}
      required
      setDisabled={setIsCropping}
      setPic={setPicture}
      square
      value={productPick.picUrl}
    />
    {progress && <ProgressBar progress={progress} />}
  </FormSection>
)

export default compose(
  branch(({ productPick }) => productPick._destroy, renderNothing),
  withState('progress', 'setProgress', null),
  withHandlers({
    editProductPickValue: ({ productPick, index, onChange }) => event => {
      const name = event.target.name.replace('productPick_', '')
      productPick[name] = event.target.value
      onChange(productPick, index)
    },
    deleteProductPick: ({ productPick, index, onChange }) => () => {
      onChange(
        {
          ...productPick,
          id: productPick.id,
          _destroy: true,
        },
        index
      )
    },
    setPictureUrl: ({ index, productPick, onChange, onFocus }) => picUrl => {
      onFocus()
      onChange({ ...productPick, picUrl }, index)
    },
    setPicture: ({ index, setProductPicture, setProgress }) => blob => {
      setProductPicture(index, blob, setProgress)
    },
  })
)(ProductPick)
