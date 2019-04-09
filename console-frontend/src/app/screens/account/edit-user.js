import auth from 'auth'
import Button from 'shared/button'
import CircularProgress from 'shared/circular-progress'
import Link from 'shared/link'
import PictureUploader, { ProgressBar, uploadImage } from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import withForm from 'ext/recompose/with-form'
import { apiMe, apiMeUpdate, apiRequest, atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'
import { TextField } from '@material-ui/core'
import { withSnackbar } from 'notistack'

const EditUser = ({
  isFormPristine,
  onFormSubmit,
  isCropping,
  setFieldValue,
  setProfilePic,
  setProfilePicUrl,
  progress,
  setIsCropping,
  isFormLoading,
  form,
}) => (
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
      inputProps={{ pattern: '.*S+.*' }}
      label="Email"
      margin="normal"
      required
      value={form.email}
    />
    <TextField
      disabled={isFormLoading || isCropping}
      fullWidth
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
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
      inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
      label="Last Name"
      margin="normal"
      name="lastName"
      onChange={setFieldValue}
      required
      value={form.lastName}
    />
    {progress && <ProgressBar progress={progress} />}
    <div style={{ marginTop: '1rem' }}>
      <Button color="primaryGradient" disabled={isFormLoading || isCropping} type="submit" variant="contained">
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

export default compose(
  withState('isCropping', 'setIsCropping', false),
  withState('profilePic', 'setProfilePic', null),
  withState('progress', 'setProgress', null),
  withSnackbar,
  withHandlers({
    formObjectTransformer: () => json => {
      return {
        email: json.email || '',
        firstName: json.firstName || '',
        lastName: json.lastName || '',
        profilePicUrl: json.profilePicUrl || '',
      }
    },
  }),
  withHandlers({
    saveFormObject: ({ enqueueSnackbar, setProgress, profilePic, setProfilePic }) => async form => {
      // upload the image
      let data
      if (profilePic) {
        const profilePicUrl = await uploadImage({
          blob: profilePic,
          setProgress,
          type: 'users-profile-pics',
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
  }),
  withHandlers({
    loadFormObject: ({ enqueueSnackbar }) => async () => {
      const { json, requestError } = await apiRequest(apiMe, [])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
        return {}
      }
      auth.setUser(json)
      return json
    },
  }),
  withForm({
    email: '',
    firstName: '',
    lastName: '',
    profilePicUrl: '',
  }),
  withHandlers({
    setProfilePicUrl: ({ form, setForm }) => profilePicUrl => {
      setForm({ ...form, profilePicUrl })
    },
  }),
  branch(({ isFormLoading }) => isFormLoading, renderComponent(CircularProgress))
)(EditUser)
