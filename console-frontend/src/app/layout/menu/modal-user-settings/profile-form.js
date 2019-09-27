import ActionContainer from './action-container'
import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import ImageUploader from 'shared/image-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import useForm from 'ext/hooks/use-form'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field, FormHelperText } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { useSnackbar } from 'notistack'

const formObjectTransformer = json => {
  return {
    email: json.email || '',
    firstName: json.firstName || '',
    lastName: json.lastName || '',
    currency: json.currency || 'EUR',
    imgUrl: json.img.url || '',
    imgRect: json.imgRect || {},
    socialMediaUrl: json.socialMediaUrl || '',
    bio: json.bio || '',
  }
}

const inputProps = { pattern: '.*S+.*' }

const ProfileForm = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)
  const [isUploaderLoading, setIsUploaderLoading] = useState(false)

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        enqueueSnackbar('Successfully updated personal info', { variant: 'success' })
        auth.setUser(json)
      }
      return json
    },
    [enqueueSnackbar]
  )

  const loadFormObject = useCallback(
    async () => {
      const { json, requestError } = await apiRequest(apiMe, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return {}
      }
      auth.setUser(json)
      return json
    },
    [enqueueSnackbar]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, mergeForm, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const setImage = useCallback(
    image => {
      mergeForm({ imgUrl: image.url, imgRect: image.imgRect })
    },
    [mergeForm]
  )

  const imageUploaderValue = useMemo(() => ({ url: form.imgUrl, imgRect: form.imgRect }), [form.imgRect, form.imgUrl])

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <ImageUploader
        aspectRatio={1}
        circle
        disabled={isFormLoading || isCropping || isUploaderLoading}
        isUserProfileImage
        label="Picture"
        onChange={setImage}
        setDisabled={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        value={imageUploaderValue}
      />
      <Field
        disabled
        fullWidth
        id="email"
        inputProps={inputProps}
        label="Email"
        margin="normal"
        required
        value={form.email}
      />
      <Field
        autoFocus
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="First Name"
        margin="normal"
        name="firstName"
        onChange={setFieldValue}
        required
        value={form.firstName}
      />
      <Field
        disabled={isFormLoading || isCropping || isUploaderLoading}
        fullWidth
        inputProps={atLeastOneNonBlankCharInputProps}
        label="Last Name"
        margin="normal"
        name="lastName"
        onChange={setFieldValue}
        required
        value={form.lastName}
      />
      {auth.isAffiliate() && (
        <Field
          disabled={isFormLoading || isCropping || isUploaderLoading}
          fullWidth
          label="Social Media URL"
          margin="normal"
          name="socialMediaUrl"
          onChange={setFieldValue}
          required
          type="URL"
          value={form.socialMediaUrl}
        />
      )}
      {auth.isSeller() && (
        <>
          <Field
            disabled={isFormLoading || isCropping || isUploaderLoading}
            fullWidth
            inputProps={atLeastOneNonBlankCharInputProps}
            label="Bio"
            margin="normal"
            name="bio"
            onChange={setFieldValue}
            required
            value={form.bio}
          />
          <FormHelperText>{'A short text that will be shown near your name.'}</FormHelperText>
        </>
      )}
      <ActionContainer>
        <Button
          color="primaryGradient"
          disabled={isFormLoading || isCropping || isFormPristine || isFormSubmitting || isUploaderLoading}
          inline
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          tooltipEnabled
          tooltipPlacement="right"
          tooltipText="No changes to save"
          type="submit"
          variant="contained"
        >
          {'Save'}
        </Button>
      </ActionContainer>
    </form>
  )
}

export default ProfileForm
