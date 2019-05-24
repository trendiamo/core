import characterLimits from 'shared/character-limits'
import PictureUploader, { ProgressBar } from 'shared/picture-uploader'
import React, { memo, useCallback, useState } from 'react'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { Cancel, Field, FormHelperText, FormSection } from 'shared/form-elements'

const ProductPick = ({
  allowDelete,
  isCropping,
  isFormLoading,
  index,
  setProductPickForm,
  onFocus,
  folded,
  productPick,
  setIsCropping,
  setProductPicture,
}) => {
  const [progress, setProgress] = useState(null)

  const onChange = useCallback(
    newProductPickCallback => {
      setProductPickForm(oldProductPick => ({ ...oldProductPick, ...newProductPickCallback(oldProductPick) }), index)
    },
    [index, setProductPickForm]
  )

  const editProductPickValue = useCallback(
    event => {
      const name = event.target.name.replace('productPick_', '')
      const value = event.target.value
      onChange(productPick => ({ ...productPick, [name]: value }))
    },
    [onChange]
  )

  const deleteProductPick = useCallback(
    () => {
      onChange(() => ({ _destroy: true }))
    },
    [onChange]
  )

  const setPictureUrl = useCallback(
    picUrl => {
      onFocus()
      onChange(productPick => ({ ...productPick, picUrl }))
    },
    [onFocus, onChange]
  )

  const setPicture = useCallback(
    blob => {
      setProductPicture(index, blob, setProgress)
    },
    [index, setProductPicture]
  )

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
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Url"
        margin="normal"
        name="productPick_url"
        onChange={editProductPickValue}
        onFocus={onFocus}
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
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Name"
        margin="normal"
        max={characterLimits.showcase.productName}
        name="productPick_name"
        onChange={editProductPickValue}
        onFocus={onFocus}
        required
        value={productPick.name}
      />
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Description"
        margin="normal"
        max={characterLimits.showcase.productDescription}
        name="productPick_description"
        onChange={editProductPickValue}
        onFocus={onFocus}
        required
        value={productPick.description}
      />
      <Field
        disabled={isCropping || isFormLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
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
        value={productPick.picUrl}
      />
      {progress && <ProgressBar progress={progress} />}
    </FormSection>
  )
}

export default memo(ProductPick)
