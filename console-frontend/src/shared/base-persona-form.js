import AddItemButton from 'shared/form-elements/add-item-button'
import characterLimits from 'shared/character-limits'
import CircularProgress from 'shared/circular-progress'
import PictureUploader from 'shared/picture-uploader'
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
    <PictureUploader
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

const BasePersonaForm = ({
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
  const setPicture = useCallback(
    picture => {
      mergeForm({ profilePic: { url: picture.url }, picRect: picture.picRect })
    },
    [mergeForm]
  )

  const [withAnimationUploader, setWithAnimationUploader] = useState(false)

  const addAnimationUploader = useCallback(() => setWithAnimationUploader(true), [])

  const setAnimation = useCallback(
    animation => {
      mergeForm({ profilePicAnimation: { url: animation.url } })
    },
    [mergeForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={onFormSubmit}>
      <UploadersContainer>
        <PictureUploader
          aspectRatio={1}
          circle
          disabled={isFormLoading || isCropping || isUploaderLoading}
          label="Picture"
          onChange={setPicture}
          required
          setDisabled={setIsCropping}
          setIsUploaderLoading={setIsUploaderLoading}
          value={{ url: form.profilePic.url, picRect: form.picRect }}
        />
        {withAnimationUploader || form.profilePicAnimation.url ? (
          <AnimationUploader
            circle
            disabled={isFormLoading || isCropping || isUploaderLoading}
            label="Animated Picture"
            setAnimation={setAnimation}
            setIsUploaderLoading={setIsUploaderLoading}
            value={{ url: form.profilePicAnimation.url }}
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
        max={characterLimits.persona.name}
        name="name"
        onChange={setFieldValue}
        required
        value={form.name}
      />
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Description"
        margin="normal"
        max={characterLimits.persona.description}
        name="description"
        onChange={setFieldValue}
        required
        value={form.description}
      />
      <FormHelperText>{"A short text that is shown near the persona's name."}</FormHelperText>
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        label="Instagram Profile URL"
        margin="normal"
        name="instagramUrl"
        onChange={setFieldValue}
        value={form.instagramUrl}
      />
      <FormHelperText>{"Instagram link icon will appear near the persona's name."}</FormHelperText>
    </Form>
  )
}

export default BasePersonaForm
