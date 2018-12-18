import Label from 'shared/label'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { Grid, TextField } from '@material-ui/core'

const ProductPick = ({
  allowDelete,
  deleteProductPick,
  editProductPickValue,
  isCropping,
  isFormLoading,
  index,
  productPick,
  progress,
  setProductPicture,
  setIsCropping,
  setPicture,
}) => (
  <FormSection
    actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteProductPick} />}
    hideBottom
    hideTop={index === 0}
    title={`Product Pick #${index + 1}`}
  >
    <Grid item sm={6}>
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Url"
        margin="normal"
        name="productPick_url"
        onChange={editProductPickValue}
        required
        value={productPick.url}
      />
      <TextField
        disabled={isCropping || isFormLoading}
        fullWidth
        label="Name"
        margin="normal"
        name="productPick_name"
        onChange={editProductPickValue}
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
        required
        value={productPick.displayPrice}
      />
      <Label>{'Picture'}</Label>
      <PictureUploader
        disabled={isCropping}
        onChange={setPicture}
        setDisabled={setIsCropping}
        setProfilePic={setProductPicture}
        square
        value={productPick.picUrl}
      />
      {progress && <ProgressBar progress={progress} />}
    </Grid>
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
          id: productPick.id,
          _destroy: true,
        },
        index
      )
    },
    setPicture: ({ index, productPick, onChange }) => picUrl => {
      onChange({ ...productPick, picUrl }, index)
    },
    setProductPicture: ({ index, setProductPicture, setProgress }) => blob => {
      setProductPicture(index, blob, setProgress)
    },
  })
)(ProductPick)
