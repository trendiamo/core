import auth from 'auth'
import Button from '@material-ui/core/Button'
import Label from 'shared/label'
import Link from 'shared/link'
import Notification from 'shared/notification'
import PictureUploader from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import TextField from '@material-ui/core/TextField'
import withForm from 'ext/recompose/with-form'
import { apiMe, apiMeUpdate } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { Prompt } from 'react-router'

const EditUser = ({ info, isFormPristine, onFormSubmit, form, isFormLoading, setFieldValue, setProfilePicUrl }) => (
  <form onSubmit={onFormSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isFormPristine} />
    <Label>{'Picture'}</Label>
    <PictureUploader
      disabled={isFormLoading}
      onChange={setProfilePicUrl}
      type="users-profile-pics"
      value={form.profilePicUrl}
    />
    <Notification data={info} />
    <TextField disabled fullWidth id="email" label="Email" margin="normal" required value={form.email} />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="First Name"
      margin="normal"
      name="firstName"
      onChange={setFieldValue}
      required
      value={form.firstName}
    />
    <TextField
      disabled={isFormLoading}
      fullWidth
      label="Last Name"
      margin="normal"
      name="lastName"
      onChange={setFieldValue}
      required
      value={form.lastName}
    />
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" disabled={isFormLoading} type="submit" variant="contained">
        {'Save'}
      </Button>
    </div>
    <div style={{ marginTop: '1rem' }}>
      <Link to={routes.passwordChange()}>
        <Button color="default" variant="text">
          {'Change Password'}
        </Button>
      </Link>
    </div>
  </form>
)

export default compose(
  withState('info', 'setInfo', null),
  withHandlers({
    loadFormObject: ({ setInfo }) => async () => {
      const user = await apiMe(setInfo)
      const userObject = {
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profilePicUrl: user.profilePicUrl || '',
      }
      auth.setUser(user)
      return userObject
    },
    saveFormObject: ({ setInfo }) => async form => {
      const user = await apiMeUpdate({ user: form }, setInfo)
      auth.setUser(user)
      return user
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
  })
)(EditUser)
