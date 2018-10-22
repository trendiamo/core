import { apiPasswordChange } from '../../auth/utils'
import { Authenticated } from 'react-admin'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import routes from 'app/routes'
import { withRouter } from 'react-router'
import { compose, withHandlers, withState } from 'recompose'
import { Notification, StyledButton, StyledForm } from '../shared'

const ChangePassword = ({ info, passwordForm, passwordResetSubmit, setFieldValue, location }) => (
  <Authenticated location={location}>
    <AuthLayout title="Change Password">
      <StyledForm onSubmit={passwordResetSubmit}>
        <Notification data={info} />
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="currentPassword">{'Current Password'}</InputLabel>
          <Input
            autoFocus
            name="currentPassword"
            onChange={setFieldValue}
            required
            type="password"
            value={passwordForm.currentPassword}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="password">{'New Password'}</InputLabel>
          <Input name="password" onChange={setFieldValue} type="password" value={passwordForm.password} />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="passwordConfirmation">{'Repeat Password'}</InputLabel>
          <Input
            name="passwordConfirmation"
            onChange={setFieldValue}
            required
            type="password"
            value={passwordForm.passwordConfirmation}
          />
        </FormControl>
        <StyledButton color="primary" fullWidth type="submit" variant="raised">
          {'Reset'}
        </StyledButton>
      </StyledForm>
    </AuthLayout>
  </Authenticated>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }),
  withState('info', 'setInfo', null),
  withRouter,
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setInfo, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password === passwordForm.passwordConfirmation) {
        const success = await apiPasswordChange(
          {
            user: {
              current_password: passwordForm.currentPassword,
              password: passwordForm.password,
              password_confirmation: passwordForm.passwordConfirmation,
            },
          },
          setInfo
        )
        if (success) history.push(routes.root())
      } else {
        setInfo({ message: "New passwords don't match", status: 'error' })
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
  })
)(ChangePassword)
