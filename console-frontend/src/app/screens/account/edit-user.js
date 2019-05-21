import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import Link from 'shared/link'
import PictureUploader, { ProgressBar, uploadPicture } from 'shared/picture-uploader'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
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
  }
}

const inputProps = { pattern: '.*S+.*' }

const EditUser = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isCropping, setIsCropping] = useState(false)
  const [profilePic, setProfilePic] = useState(null)
  const [progress, setProgress] = useState(null)

  const saveFormObject = useCallback(
    async form => {
      // upload the image
      let data
      if (profilePic) {
        const profilePicUrl = await uploadPicture({
          blob: profilePic,
          setProgress,
        })
        data = { ...form, profilePicUrl }
      } else {
        data = form
      }
      // update user data
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: data }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        enqueueSnackbar('Successfully updated personal info', { variant: 'success' })
        auth.setUser(json)
      }
      setProfilePic(null)
      return json
    },
    [enqueueSnackbar, profilePic, setProfilePic]
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

  const setProfilePicUrl = useCallback(
    profilePicUrl => {
      mergeForm({ profilePicUrl })
    },
    [mergeForm]
  )

  if (isFormLoading) return <CircularProgress />

  return (
    <form onSubmit={onFormSubmit}>
      <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
      <PictureUploader
        disabled={isCropping}
        label="Picture"
        onChange={setProfilePicUrl}
        setDisabled={setIsCropping}
        setPic={setProfilePic}
        value={form.profilePicUrl}
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
      {progress && <ProgressBar progress={progress} />}
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
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={routes.passwordChange()}>
          <Button color="primaryText" variant="text">
            {'Change Password'}
          </Button>
        </Link>
      </div>
    </form>
  )
}

export default EditUser
