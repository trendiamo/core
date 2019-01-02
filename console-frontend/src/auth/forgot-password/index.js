import auth from 'auth'
import AuthLayout from 'auth/layout'
import Notification from 'shared/notification'
import queryString from 'query-string'
import React from 'react'
import routes from 'app/routes'
import { apiPasswordReset, apiRequest } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withSnackbar } from 'notistack'

const AuthMessage = () => (
  <React.Fragment>
    <AuthTitle variant="h4">
      {"Don't have an account?"}
      <br />
      {'Get to know what we can do for you.'}
    </AuthTitle>
    <AuthText style={{ color: '#fff', marginBottom: '10px' }} variant="body2">
      {'Is something wrong? '}
      <AuthLink href="mailto:support@trendiamo.com">{'Get in touch!'}</AuthLink>
    </AuthText>
    <AuthLink href="https://trendiamo.com">
      <AuthButton>{'Learn about Trendiamo'}</AuthButton>
    </AuthLink>
  </React.Fragment>
)

const PasswordReset = ({ errors, passwordForm, passwordResetSubmit, setFieldValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordResetSubmit}>
      <Notification data={errors} />
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
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" type="submit" variant="contained">
          {'Reset'}
        </Button>
      </div>
    </form>
  </AuthLayout>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', {
    fieldOne: '',
    fieldTwo: '',
  }),
  withState('errors', 'setErrors', null),
  withSnackbar,
  withHandlers({
    passwordResetSubmit: ({ enqueueSnackbar, passwordForm, setErrors }) => async event => {
      event.preventDefault()
      const parsedUrl = queryString.parse(window.location.search)
      if (passwordForm.fieldOne === passwordForm.fieldTwo) {
        const response = await apiRequest(
          apiPasswordReset,
          [
            {
              user: {
                password: passwordForm.fieldTwo,
                reset_password_token: parsedUrl.reset_password_token,
              },
            },
          ],
          {
            enqueueSnackbar,
          }
        )
        const errors = extractErrors(response)
        if (!response.errors && !response.error)
          if (errors) {
            setErrors(errors)
          } else {
            auth.setUser(response.user)
          }
        if (auth.isLoggedIn()) {
          window.location.href = routes.root()
        }
      } else {
        setErrors({ status: 'error', message: "Passwords don't match" })
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(PasswordReset)
