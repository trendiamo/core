import characterLimits from 'shared/character-limits'
import PictureUploader from 'shared/picture-uploader'
import React, { memo, useCallback } from 'react'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { Cancel, Field, FormHelperText, FormSection } from 'shared/form-elements'

const ProductPick = ({
  allowDelete,
  folded,
  index,
  isCropping,
  isFormLoading,
  isUploaderLoading,
  onFocus,
  productPick,
  setIsCropping,
  setIsUploaderLoading,
  setProductPickForm,
}) => {
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

  const setPicture = useCallback(
    picture => {
      onFocus()
      onChange(productPick => ({ ...productPick, picture: { url: picture.url }, picRect: picture.picRect }))
    },
    [onChange, onFocus]
  )

  return (
    <FormSection
      actions={
        allowDelete && (
          <Cancel
            disabled={isCropping || isFormLoading || isUploaderLoading}
            index={index}
            onClick={deleteProductPick}
          />
        )
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
        autoFocus={index > 0 && !productPick.id}
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="URL"
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
        disabled={isCropping || isFormLoading || isUploaderLoading}
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
        disabled={isCropping || isFormLoading || isUploaderLoading}
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
        disabled={isCropping || isFormLoading || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Display Price"
        margin="normal"
        name="productPick_displayPrice"
        onChange={editProductPickValue}
        onFocus={onFocus}
        value={productPick.displayPrice}
      />
      <PictureUploader
        aspectRatio={1}
        disabled={isCropping || isFormLoading || isUploaderLoading}
        label="Picture"
        onChange={setPicture}
        required
        setDisabled={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        value={{ url: productPick.picture.url, picRect: productPick.picRect }}
      />
    </FormSection>
  )
}

export default memo(ProductPick)
