import auth from 'app/auth'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Label from 'shared/label'
import Notification from 'shared/notification'
import PictureUploader from 'shared/picture-uploader'
import React from 'react'
import { apiMe, apiMeUpdate } from 'app/auth/utils'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { StyledButton, StyledForm } from 'app/screens/shared'

const EditUser = ({ info, onSubmit, userForm, setFieldValue, setProfilePicUrl }) => (
  <StyledForm onSubmit={onSubmit}>
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
    <StyledButton color="primary" fullWidth type="submit" variant="raised">
      {'Save'}
    </StyledButton>
  </StyledForm>
)

export default compose(
  withState('userForm', 'setUserForm', {
    email: '',
    firstName: '',
    lastName: '',
    profilePicUrl: '',
  }),
  withState('info', 'setInfo', null),
  withHandlers({
    onSubmit: ({ userForm, setInfo }) => async event => {
      event.preventDefault()
      const user = await apiMeUpdate({ user: userForm }, setInfo)
      auth.setUser(user)
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
      const { setUserForm, setInfo } = this.props
      const user = await apiMe(setInfo)
      auth.setUser(user)
      setUserForm({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profilePicUrl: user.profilePicUrl || '',
      })
    },
  })
)(EditUser)
