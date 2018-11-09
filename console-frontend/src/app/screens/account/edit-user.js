import auth from 'auth'
import Button from '@material-ui/core/Button'
import Label from 'shared/label'
import Link from 'shared/link'
import Notification from 'shared/notification'
import PictureUploader from 'shared/picture-uploader'
import React from 'react'
import routes from 'app/routes'
import TextField from '@material-ui/core/TextField'
import { apiMe, apiMeUpdate } from 'utils'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'
import { Prompt } from 'react-router'

const EditUser = ({ info, isPristine, onSubmit, userForm, isLoading, setFieldValue, setProfilePicUrl }) => (
  <form onSubmit={onSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isPristine} />
    <Label>{'Picture'}</Label>
    <PictureUploader
      disabled={isLoading}
      onChange={setProfilePicUrl}
      type="users-profile-pics"
      value={userForm.profilePicUrl}
    />
    <Notification data={info} />
    <TextField disabled fullWidth id="email" label="Email" margin="normal" required value={userForm.email} />
    <TextField
      disabled={isLoading}
      fullWidth
      label="First Name"
      margin="normal"
      name="firstName"
      onChange={setFieldValue}
      required
      value={userForm.firstName}
    />
    <TextField
      disabled={isLoading}
      fullWidth
      label="Last Name"
      margin="normal"
      name="lastName"
      onChange={setFieldValue}
      required
      value={userForm.lastName}
    />
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" disabled={isLoading} type="submit" variant="contained">
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
  withState('initialUserForm', 'setInitialUserForm', {
    email: '',
    firstName: '',
    lastName: '',
    profilePicUrl: '',
  }),
  withState('userForm', 'setUserForm', ({ initialUserForm }) => initialUserForm),
  withState('info', 'setInfo', null),
  withState('isLoading', 'setIsLoading', true),
  withProps(({ userForm, initialUserForm }) => ({
    isPristine: isEqual(userForm, initialUserForm),
  })),
  withHandlers({
    onSubmit: ({ userForm, setInfo, setInitialUserForm }) => async event => {
      event.preventDefault()
      const user = await apiMeUpdate({ user: userForm }, setInfo)
      auth.setUser(user)
      setInitialUserForm(userForm)
      return user
    },
    setFieldValue: ({ userForm, setUserForm }) => event => {
      setUserForm({ ...userForm, [event.target.name]: event.target.value })
    },
    setProfilePicUrl: ({ userForm, setUserForm }) => profilePicUrl => {
      setUserForm({ ...userForm, profilePicUrl })
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setUserForm, setInfo, setInitialUserForm, setIsLoading } = this.props
      const user = await apiMe(setInfo)
      setIsLoading(false)
      const userObject = {
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profilePicUrl: user.profilePicUrl || '',
      }
      auth.setUser(user)
      setInitialUserForm(userObject)
      setUserForm(userObject)
    },
  })
)(EditUser)
