import AuthLayout from 'auth/layout'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import { apiPasswordEmailLink, apiRequest } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Button, FormControl, Input, InputLabel, Typography } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
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

const PasswordReset = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordChangeSubmit}>
      <Typography variant="body2">
        {'We can help you reset your password using your email address linked to your account.'}
      </Typography>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="password">{'Email'}</InputLabel>
        <Input
          autoFocus
          id="email"
          name="email"
          onChange={setPasswordFormValue}
          required
          type="email"
          value={passwordForm.email}
        />
      </FormControl>
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" type="submit" variant="contained">
          {'Send Reset Instructions'}
        </Button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={routes.login()}>
          <Button color="default" fullWidth variant="text">
            {'Back to Login'}
          </Button>
        </Link>
      </div>
    </form>
  </AuthLayout>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', { email: '' }),
  withSnackbar,
  withHandlers({
    onBackToLogin: () => event => {
      event.preventDefault()
      window.location.href = routes.login()
    },
    passwordChangeSubmit: ({ enqueueSnackbar, passwordForm }) => async event => {
      event.preventDefault()
      const json = await apiRequest(apiPasswordEmailLink, [{ user: { email: passwordForm.email } }], {
        enqueueSnackbar,
        successMessage: 'Email sent!',
        successVariant: 'info',
      })
      return json
    },
    setPasswordFormValue: ({ passwordForm, setPasswordForm }) => event =>
      setPasswordForm({
        ...passwordForm,
        [event.target.name]: event.target.value,
      }),
  })
)(PasswordReset)
