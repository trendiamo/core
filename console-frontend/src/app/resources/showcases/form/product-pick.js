import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withState } from 'recompose'
import { Cancel, FormSection } from 'shared/form-elements'
import { Grid, TextField } from '@material-ui/core'
import { Reorder as ReorderIcon } from '@material-ui/icons'
import { SortableHandle } from 'react-sortable-hoc'

const StyledReorderIcon = styled(ReorderIcon)`
  cursor: ns-resize;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 1rem;
`

const DragHandle = SortableHandle(() => <StyledReorderIcon />)

const ProductPick = ({
  allowDelete,
  deleteProductPick,
  editProductPickValue,
  isCropping,
  isFormLoading,
  index,
  productPick,
  progress,
  setPicture,
  setIsCropping,
  setPictureUrl,
}) => (
  <FormSection
    actions={allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteProductPick} />}
    backgroundColor="#FFFFFF"
    dragHandle={<DragHandle />}
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
    setPictureUrl: ({ index, productPick, onChange }) => picUrl => {
      onChange({ ...productPick, picUrl }, index)
    },
    setPicture: ({ index, setProductPicture, setProgress }) => blob => {
      setProductPicture(index, blob, setProgress)
    },
  })
)(ProductPick)
