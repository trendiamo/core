import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import PictureUploader from 'shared/picture-uploader'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import useForm from 'ext/hooks/use-form'
import WhiteButton from 'shared/white-button'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Field } from 'shared/form-elements'
import { Prompt } from 'react-router'
import { TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const ActionContainer = styled.div`
  margin: 16px 0 10px;
`

const formObjectTransformer = json => {
  return {
    email: json.email || '',
    firstName: json.firstName || '',
    lastName: json.lastName || '',
    profilePicUrl: json.profilePicUrl || '',
    picRect: json.picRect || {},
  }
}

const inputProps = { pattern: '.*S+.*' }

const EditMe = ({ togglePasswordForm }) => {
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

  const setPicture = useCallback(
    picture => {
      mergeForm({ profilePicUrl: picture.url, picRect: picture.picRect })
    },
    [mergeForm]
  )

  const pictureUploaderValue = useMemo(() => ({ url: form.profilePicUrl, picRect: form.picRect }), [
    form.picRect,
    form.profilePicUrl,
  ])

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <PictureUploader
        aspectRatio={1}
        circle
        disabled={isFormLoading || isCropping || isUploaderLoading}
        label="Picture"
        onChange={setPicture}
        setDisabled={setIsCropping}
        setIsUploaderLoading={setIsUploaderLoading}
        value={pictureUploaderValue}
      />
      <TextField
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
      <TextField
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
        <WhiteButton inline onClick={togglePasswordForm} variant="contained">
          {'Change Password'}
        </WhiteButton>
      </ActionContainer>
    </form>
  )
}

export default EditMe
