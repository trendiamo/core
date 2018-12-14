import React from 'react'
import { compose, withHandlers } from 'recompose'
import { Grid, TextField } from '@material-ui/core'

const ProductPick = ({ index, isFormLoading, form, editProductPickValue, ...props }) => (
  <Grid item sm={6}>
    <TextField
      {...props}
      disabled={isFormLoading}
      fullWidth
      label="Url"
      margin="normal"
      name="url"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].url}
    />
    <TextField
      {...props}
      disabled={isFormLoading}
      fullWidth
      label="Name"
      margin="normal"
      name="name"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].name}
    />
    <TextField
      {...props}
      disabled={isFormLoading}
      fullWidth
      label="Description"
      margin="normal"
      name="description"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].description}
    />
    <TextField
      {...props}
      disabled={isFormLoading}
      fullWidth
      label="Display Price"
      margin="normal"
      name="displayPrice"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].displayPrice}
    />
    <TextField
      {...props}
      disabled={isFormLoading}
      fullWidth
      label="Product Pick Pic Url"
      margin="normal"
      name="picUrl"
      onChange={editProductPickValue}
      required
      value={form.productPicksAttributes[index].picUrl}
    />
  </Grid>
)

export default compose(
  withHandlers({
    editProductPickValue: ({ index, onChange }) => event => {
      onChange(index, event.target)
    },
  })
)(ProductPick)
