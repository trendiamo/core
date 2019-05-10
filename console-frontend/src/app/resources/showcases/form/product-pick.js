import characterLimits from 'shared/character-limits'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { Cancel, Field, FormSection } from 'shared/form-elements'
import { FormHelperText } from '@material-ui/core'

const ProductPick = ({
  allowDelete,
  isCropping,
  isFormLoading,
  index,
  onChange,
  onFocus,
  folded,
  productPick,
  setIsCropping,
  setProductPicture,
}) => {
  const [progress, setProgress] = useState(null)

  const editProductPickValue = useCallback(
    event => {
      const name = event.target.name.replace('productPick_', '')
      onChange(Object.assign({}, productPick, { [name]: event.target.value }), index)
    },
    [index, onChange, productPick]
  )

  const deleteProductPick = useCallback(
    () => {
      onChange(
        {
          ...productPick,
          id: productPick.id,
          _destroy: true,
        },
        index
      )
    },
    [index, onChange, productPick]
  )

  const handleFocus = useCallback(
    () => {
      onFocus && onFocus()
    },
    [onFocus]
  )

  const setPictureUrl = useCallback(
    picUrl => {
      onFocus()
      onChange({ ...productPick, picUrl }, index)
    },
    [index, onChange, onFocus, productPick]
  )

  const setPicture = useCallback(
    blob => {
      setProductPicture(index, blob, setProgress)
    },
    [index, setProductPicture]
  )

  if (productPick._destroy) return null

  return (
    <FormSection
      actions={
        allowDelete && <Cancel disabled={isCropping || isFormLoading} index={index} onClick={deleteProductPick} />
      }
      backgroundColor="#fff"
      dragHandle
      ellipsize
      foldable
      folded={folded}
      hideBottom
      hideTop={index === 0}
      title={productPick.id ? productPick.name : 'New Product Pick'}
    >
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Url"
        margin="normal"
        name="productPick_url"
        onChange={editProductPickValue}
        onFocus={handleFocus}
        required
        type="URL"
        value={productPick.url}
      />
      <FormHelperText>
        {
          'Use the whole url, eg: https://www.example.com/page1 - you can test it by clicking on the item in the preview. Hint: you can copy/paste links from the URL Generator.'
        }
      </FormHelperText>
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Name"
        margin="normal"
        max={characterLimits.showcase.productName}
        name="productPick_name"
        onChange={editProductPickValue}
        onFocus={handleFocus}
        required
        value={productPick.name}
      />
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Description"
        margin="normal"
        max={characterLimits.showcase.productDescription}
        name="productPick_description"
        onChange={editProductPickValue}
        onFocus={handleFocus}
        required
        value={productPick.description}
      />
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
        label="Display Price"
        margin="normal"
        name="productPick_displayPrice"
        onChange={editProductPickValue}
        onFocus={handleFocus}
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
}

export default ProductPick
