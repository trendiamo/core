import { apiPasswordChange } from '../../auth/utils'
import { Authenticated } from 'react-admin'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import routes from 'app/routes'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router'
import { compose, withHandlers, withState } from 'recompose'
import { StyledButton, StyledForm } from '../shared'

const ChangePassword = ({ errors, passwordForm, passwordResetSubmit, setFieldValue, location }) => (
  <Authenticated location={location}>
    <AuthLayout title="Change Password">
      <StyledForm onSubmit={passwordResetSubmit}>
        {errors && (
          <Typography align="center" color="error" variant="body2">
            {errors}
          </Typography>
        )}
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="email">{'Current Password'}</InputLabel>
          <Input
            autoComplete="email"
            autoFocus
            id="currentPassword"
            name="currentPassword"
            onChange={setFieldValue}
            type="password"
            value={passwordForm.currentPassword}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="email">{'New Password'}</InputLabel>
          <Input
            autoComplete="email"
            id="email"
            name="password"
            onChange={setFieldValue}
            type="password"
            value={passwordForm.password}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="password">{'Repeat Password'}</InputLabel>
          <Input
            autoComplete="current-password"
            id="password"
            name="password_confirmation"
            onChange={setFieldValue}
            required
            type="password"
            value={passwordForm.password_confirmation}
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
    password_confirmation: '',
  }),
  withState('errors', 'setErrors', null),
  withRouter,
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setErrors, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password === passwordForm.password_confirmation) {
        const success = await apiPasswordChange(
          {
            user: {
              current_password: passwordForm.currentPassword,
              password: passwordForm.password,
              password_confirmation: passwordForm.password_confirmation,
            },
          },
          setErrors
        )
        if (success) history.push(routes.root())
      } else {
        setErrors("New passwords don't match")
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
  })
)(ChangePassword)
