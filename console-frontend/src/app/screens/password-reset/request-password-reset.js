import { apiPasswordEmailLink } from '../../auth/utils'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import { Notification, StyledButton, StyledForm } from '../shared'

const CustomPasswordResetJSX = ({
  passwordForm,
  passwordChangeSubmit,
  setPasswordFormValue,
  notification,
  onBackToLogin,
}) => (
  <AuthLayout title="Reset Password">
    <StyledForm onSubmit={passwordChangeSubmit}>
      {notification && (
        <Notification align="center" variant="body2">
          {notification}
        </Notification>
      )}
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="password">{'Email'}</InputLabel>
        <Input
          id="email"
          name="email"
          onChange={setPasswordFormValue}
          required
          type="email"
          value={passwordForm.email}
        />
      </FormControl>
      <StyledButton color="primary" fullWidth type="submit" variant="raised">
        {'Send Reset Instructions'}
      </StyledButton>
      <StyledButton color="secondary" fullWidth onClick={onBackToLogin} variant="raised">
        {'Back to Login'}
      </StyledButton>
    </StyledForm>
  </AuthLayout>
)

const CustomPasswordReset = compose(
  withState('passwordForm', 'setPasswordForm', { email: '' }),
  withState('notification', 'setNotification', null),
  withHandlers({
    onBackToLogin: () => event => {
      event.preventDefault()
      window.location.href = '/login'
    },
    passwordChangeSubmit: ({ passwordForm, setNotification }) => async event => {
      event.preventDefault()
      await apiPasswordEmailLink({ user: { email: passwordForm.email } })
      setNotification('Email sent!')
    },
    setPasswordFormValue: ({ passwordForm, setPasswordForm }) => event =>
      setPasswordForm({
        ...passwordForm,
        [event.target.name]: event.target.value,
      }),
  })
)(CustomPasswordResetJSX)

export default CustomPasswordReset
