import AuthLayout from 'auth/layout'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Link from 'shared/link'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import Typography from '@material-ui/core/Typography'
import { apiPasswordEmailLink } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { compose, withHandlers, withState } from 'recompose'

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

const PasswordReset = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue, success }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordChangeSubmit}>
      <Typography variant="body2">
        {'We can help you reset your password using your email address linked to your account.'}
      </Typography>
      <Notification data={{ status: 'success', message: success }} />
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
  withState('success', 'setSuccess', null),
  withHandlers({
    onBackToLogin: () => event => {
      event.preventDefault()
      window.location.href = routes.login()
    },
    passwordChangeSubmit: ({ passwordForm, setSuccess }) => async event => {
      event.preventDefault()
      const json = await apiPasswordEmailLink({ user: { email: passwordForm.email } })
      setSuccess('Email sent!')
      return json
    },
    setPasswordFormValue: ({ passwordForm, setPasswordForm }) => event =>
      setPasswordForm({
        ...passwordForm,
        [event.target.name]: event.target.value,
      }),
  })
)(PasswordReset)
