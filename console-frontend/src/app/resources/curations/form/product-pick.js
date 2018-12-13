import Label from 'shared/label'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Grid, TextField } from '@material-ui/core'

const ProductPick = ({
  setProductPicture,
  setIsCropping,
  isCropping,
  index,
  isFormLoading,
  form,
  editProductPickValue,
  progress,
  setProductPicks,
}) => (
  <Grid item sm={6}>
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Url"
      margin="normal"
      name="url"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].url}
    />
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].name}
    />
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Description"
      margin="normal"
      name="description"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].description}
    />
    <TextField
      disabled={isCropping || isFormLoading}
      fullWidth
      label="Display Price"
      margin="normal"
      name="displayPrice"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].displayPrice}
    />
    <Label>{'Picture'}</Label>
    <PictureUploader
      disabled={isCropping}
      onChange={setProductPicks}
      setDisabled={setIsCropping}
      setProfilePic={setProductPicture}
      square
      value={form.productPicksAttributes[index].picUrl}
    />
    {progress && <ProgressBar progress={progress} />}
  </Grid>
)

export default compose(
  withState('progress', 'setProgress', null),
  withHandlers({
    editProductPickValue: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
  }),
  withHandlers({
    setProductPicks: ({ index, form, setProductPicks }) => picUrl => {
      form.productPicksAttributes[index].picUrl = picUrl
      setProductPicks(form.productPicksAttributes)
    },
    setProductPicture: ({ index, setProductPicture, setProgress }) => blob => {
      setProductPicture(index, blob, setProgress)
    },
  })
)(ProductPick)
