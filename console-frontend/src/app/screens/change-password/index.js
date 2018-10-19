import { apiPasswordChange } from '../../auth/utils'
import { Authenticated } from 'react-admin'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
// import queryString from 'query-string'
import React from 'react'
import Typography from '@material-ui/core/Typography'
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
            name="fieldOne"
            onChange={setFieldValue}
            type="password"
            value={passwordForm.fieldOne}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="password">{'Repeat Password'}</InputLabel>
          <Input
            autoComplete="current-password"
            id="password"
            name="fieldTwo"
            onChange={setFieldValue}
            required
            type="password"
            value={passwordForm.fieldTwo}
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
    fieldOne: '',
    fieldTwo: '',
  }),
  withState('errors', 'setErrors', null),
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setErrors, errors }) => async event => {
      event.preventDefault()
      // const parsedUrl = queryString.parse(window.location.search)
      if (passwordForm.fieldOne === passwordForm.fieldTwo) {
        await apiPasswordChange(
          {
            user: {
              current_password: passwordForm.currentPassword,
              password: passwordForm.fieldOne,
              password_confirmation: passwordForm.fieldTwo,
            },
          },
          setErrors
        )
      } else {
        setErrors('New passwords dont match')
        console.log(errors)
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(ChangePassword)
