import AddItemButton from 'shared/form-elements/add-item-button'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, Form, FormHelperText } from 'shared/form-elements'
import { HelpOutline } from '@material-ui/icons'
import { Tooltip } from '@material-ui/core'

const UploadersContainer = styled.div`
  display: flex;
  width: 100%;
`

const AddAnimationUploaderButton = styled(AddItemButton)`
  align-self: center;
  margin-left: 24px;

  p {
    padding-left: 6px;
    line-height: 1;
  }
  svg {
    font-size: 20px;
  }
`

const AnimationUploaderContainer = styled.div`
  position: relative;
  margin-left: 24px;
`

const AnimationUploaderHelp = styled(HelpOutline)`
  width: 16px;
  fill: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 11px;
  right: 38px;
  z-index: 1;
`

const AnimationUploader = ({ circle, disabled, label, setAnimation, setIsUploaderLoading, value }) => (
  <AnimationUploaderContainer>
    <Tooltip
      placement="top"
      title="In your modules, you can show an animated GIF instead of the default one or when moving the mouse over a showcase item"
    >
      <AnimationUploaderHelp />
    </Tooltip>
    <ImageUploader
      circle={circle}
      disabled={disabled}
      label={label}
      onChange={setAnimation}
      setIsUploaderLoading={setIsUploaderLoading}
      type="animationUploader"
      value={value}
    />
  </AnimationUploaderContainer>
)

const BaseSellerForm = ({
  form,
  formRef,
  isCropping,
  isFormLoading,
  isFormPristine,
  isUploaderLoading,
  mergeForm,
  onFormSubmit,
  setFieldValue,
  setIsCropping,
  setIsUploaderLoading,
}) => {
  const setImg = useCallback(
    img => {
      mergeForm({ img: { url: img.url }, imgRect: img.imgRect })
    },
    [mergeForm]
  )

  const [withAnimationUploader, setWithAnimationUploader] = useState(false)

  const addAnimationUploader = useCallback(() => setWithAnimationUploader(true), [])

  const setAnimation = useCallback(
    animation => {
      mergeForm({ animatedImg: { url: animation.url } })
    },
    [mergeForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <UploadersContainer>
        <ImageUploader
          aspectRatio={1}
          circle
          disabled={isFormLoading || isCropping || isUploaderLoading}
          label="Picture"
          onChange={setImg}
          required
          setDisabled={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          value={{ url: form.img.url, imgRect: form.imgRect }}
        />
        {withAnimationUploader || form.animatedImg.url ? (
          <AnimationUploader
            circle
            disabled={isFormLoading || isCropping || isUploaderLoading}
            label="Animated Picture"
            setAnimation={setAnimation}
            setIsUploaderLoading={setIsUploaderLoading}
            value={{ url: form.animatedImg.url }}
          />
        ) : (
          <AddAnimationUploaderButton message="Add animation" onClick={addAnimationUploader} />
        )}
      </UploadersContainer>
      <Field
        autoFocus
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Name"
        margin="normal"
        max={characterLimits.seller.name}
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Bio"
        margin="normal"
        max={characterLimits.seller.bio}
        name="bio"
        onChange={setFieldValue}
        required
        value={form.bio}
      />
      <FormHelperText>{"A short text that is shown near the seller's name."}</FormHelperText>
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        label="Instagram Profile URL"
        margin="normal"
        name="instagramUrl"
        onChange={setFieldValue}
        value={form.instagramUrl}
      />
      <FormHelperText>{"Instagram link icon will appear near the seller's name."}</FormHelperText>
    </Form>
  )
}

export default BaseSellerForm
