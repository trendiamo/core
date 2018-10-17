import { apiPasswordReset } from '../../auth/utils'
import { Authenticated } from 'react-admin'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import queryString from 'query-string'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { compose, withHandlers, withState } from 'recompose'
import { StyledButton, StyledForm } from '../shared'

const CustomPasswordResetJSX = ({ errors, passwordForm, passwordResetSubmit, setFieldValue, location }) => (
  <Authenticated location={location}>
    <AuthLayout title="Reset Password">
      <StyledForm onSubmit={passwordResetSubmit}>
        {errors && (
          <Typography align="center" color="error" variant="body2">
            <div>{errors}</div>
          </Typography>
        )}
        <FormControl fullWidth margin="normal" required>
          <InputLabel htmlFor="email">{'New Password'}</InputLabel>
          <Input
            autoComplete="email"
            autoFocus
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

const CustomPasswordReset = compose(
  withState('passwordForm', 'setPasswordForm', {
    fieldOne: '',
    fieldTwo: '',
  }),
  withState('errors', 'setErrors', null),
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setErrors }) => async event => {
      event.preventDefault()
      const parsedUrl = queryString.parse(window.location.search)
      if (passwordForm.fieldOne === passwordForm.fieldTwo) {
        await apiPasswordReset(
          {
            user: {
              password: passwordForm.fieldTwo,
              reset_password_token: parsedUrl.reset_password_token,
            },
          },
          setErrors
        )
      } else {
        setErrors("Passwords don't match")
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(CustomPasswordResetJSX)

export default CustomPasswordReset
