import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import Link from 'shared/link'
import PictureUploader from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useForm from 'ext/hooks/use-form'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharInputProps } from 'utils'
import { Prompt } from 'react-router'
import { TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const formObjectTransformer = json => {
  return {
    email: json.email || '',
    firstName: json.firstName || '',
    lastName: json.lastName || '',
    profilePicUrl: json.profilePicUrl || '',
    picRect: json.picRect || '',
  }
}

const inputProps = { pattern: '.*S+.*' }

const EditMe = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)

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

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title="Your Personal Info">
      <form onSubmit={onFormSubmit}>
        <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
        <PictureUploader
          aspectRatio={1}
          circle
          disabled={isCropping}
          label="Picture"
          onChange={setPicture}
          setDisabled={setIsCropping}
          value={{ url: form.profilePicUrl, picRect: form.picRect }}
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
        <TextField
          disabled={isFormLoading || isCropping}
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
          disabled={isFormLoading || isCropping}
          fullWidth
          inputProps={atLeastOneNonBlankCharInputProps}
          label="Last Name"
          margin="normal"
          name="lastName"
          onChange={setFieldValue}
          required
          value={form.lastName}
        />
        <div style={{ marginTop: '1rem' }}>
          <Button
            color="primaryGradient"
            disabled={isFormLoading || isCropping || isFormPristine || isFormSubmitting}
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
          <Link to={routes.passwordChange()}>
            <Button color="primaryText" variant="text">
              {'Change Password'}
            </Button>
          </Link>
        </div>
      </form>
    </Section>
  )
}

export default EditMe
