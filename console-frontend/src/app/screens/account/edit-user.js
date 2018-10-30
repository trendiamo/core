import auth from 'auth'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { isEqual } from 'lodash'
import Label from 'shared/label'
import Link from 'shared/link'
import Notification from 'shared/notification'
import PictureUploader from 'shared/picture-uploader'
import { Prompt } from 'react-router'
import React from 'react'
import routes from 'app/routes'
import { apiMe, apiMeUpdate } from 'utils'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

const EditUser = ({ info, isPristine, onSubmit, userForm, setFieldValue, setProfilePicUrl }) => (
  <form onSubmit={onSubmit}>
    <Prompt message="You have unsaved changes, are you sure you want to leave?" when={!isPristine} />
    <Label>{'Picture'}</Label>
    <PictureUploader onChange={setProfilePicUrl} type="users-profile-pics" value={userForm.profilePicUrl} />
    <Notification data={info} />
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="email">{'Email'}</InputLabel>
      <Input disabled name="email" value={userForm.email} />
    </FormControl>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="firstName">{'First Name'}</InputLabel>
      <Input autoFocus name="firstName" onChange={setFieldValue} value={userForm.firstName} />
    </FormControl>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="lastName">{'Last Name'}</InputLabel>
      <Input name="lastName" onChange={setFieldValue} value={userForm.lastName} />
    </FormControl>
    <div style={{ marginTop: '1rem' }}>
      <Button color="primary" type="submit" variant="contained">
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
      const { setUserForm, setInfo, setInitialUserForm } = this.props
      const user = await apiMe(setInfo)
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
