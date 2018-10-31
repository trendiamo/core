import { apiPasswordEmailLink } from 'app/auth/utils'
import AuthLayout from 'app/screens/auth-layout'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Link from 'shared/link'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import Typography from '@material-ui/core/Typography'
import { AuthButton, AuthLink, AuthText, AuthTitle, StyledAuthForm } from 'shared/components'
import { compose, withHandlers, withState } from 'recompose'

const AuthMessage = () => (
  <React.Fragment>
    <AuthTitle variant="display1">
      {"Don't have an account?"}
      <br />
      {'Get to know what we can do for you.'}
    </AuthTitle>
    <AuthText style={{ color: '#fff', marginBottom: '10px' }} variant="body2">
      {'Is something wrong? '}
      <AuthLink href="mailto:support@trendiamo.com">{'Get in touch!'}</AuthLink>
    </AuthText>
    <a href="http://trendiamo.com">
      <AuthButton>{'Learn about Trendiamo'}</AuthButton>
    </a>
  </React.Fragment>
)

const PasswordReset = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue, info }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <StyledAuthForm onSubmit={passwordChangeSubmit}>
      <Typography variant="body1">
        {'We can help you reset your password using your email address linked to your account.'}
      </Typography>
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
    </StyledAuthForm>
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
