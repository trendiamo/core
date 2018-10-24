import { apiPasswordEmailLink } from '../../auth/utils'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import { compose, withHandlers, withState } from 'recompose'
import { Notification, StyledButton, StyledForm } from '../shared'

const PasswordReset = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue, info }) => (
  <AuthLayout title="Reset Password">
    <StyledForm onSubmit={passwordChangeSubmit}>
      <Notification data={info} />
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
      <StyledButton color="secondary" fullWidth type="submit" variant="raised">
        {'Send Reset Instructions'}
      </StyledButton>
      <Link to={routes.login()}>
        <StyledButton color="default" fullWidth variant="text">
          {'Back to Login'}
        </StyledButton>
      </Link>
    </StyledForm>
  </AuthLayout>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', { email: '' }),
  withState('info', 'setInfo', null),
  withHandlers({
    onBackToLogin: () => event => {
      event.preventDefault()
      window.location.href = routes.login()
    },
    passwordChangeSubmit: ({ passwordForm, setInfo }) => async event => {
      event.preventDefault()
      await apiPasswordEmailLink({ user: { email: passwordForm.email } }, setInfo)
    },
    setPasswordFormValue: ({ passwordForm, setPasswordForm }) => event =>
      setPasswordForm({
        ...passwordForm,
        [event.target.name]: event.target.value,
      }),
  })
)(PasswordReset)
