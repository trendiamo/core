import auth from 'auth'
import AuthLayout from 'auth/layout'
import Link from 'shared/link'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import { apiRequest, apiSignIn } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
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

const Login = ({ errors, loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Login">
    <form onSubmit={loginSubmit}>
      <Notification data={errors} />
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="email">{'E-mail'}</InputLabel>
        <Input
          autoComplete="email"
          autoFocus
          id="email"
          name="email"
          onChange={setLoginValue}
          value={loginForm.email}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="password">{'Password'}</InputLabel>
        <Input
          autoComplete="current-password"
          id="password"
          name="password"
          onChange={setLoginValue}
          required
          type="password"
          value={loginForm.password}
        />
      </FormControl>
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" fullWidth type="submit" variant="contained">
          {'Login'}
        </Button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={routes.requestPasswordReset()}>
          <Button color="default" fullWidth variant="text">
            {'Forgot Password?'}
          </Button>
        </Link>
      </div>
    </form>
  </AuthLayout>
)

export default compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('errors', 'setErrors', null),
  withSnackbar,
  withHandlers({
    loginSubmit: ({ enqueueSnackbar, loginForm, setErrors }) => async event => {
      event.preventDefault()
      const { json, errors, requestError } = await apiRequest(apiSignIn, [
        { user: { email: loginForm.email, password: loginForm.password } },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      if (!requestError && !errors) auth.setUser(json.user)
      if (auth.isLoggedIn()) window.location.href = routes.root()
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(Login)
