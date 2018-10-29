import { apiSignIn } from '../../auth/utils'
import auth from 'app/auth'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Link from 'shared/link'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import { AuthButton, AuthLink, AuthText, AuthTitle, StyledAuthForm, StyledButton } from '../shared'
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
    <AuthLink href="http://trendiamo.com">
      <AuthButton>{'Learn about Trendiamo'}</AuthButton>
    </AuthLink>
  </React.Fragment>
)

const Login = ({ info, loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Login">
    <StyledAuthForm onSubmit={loginSubmit}>
      <Notification data={info} />
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
      <StyledButton color="secondary" fullWidth type="submit" variant="contained">
        {'Login'}
      </StyledButton>
      <Link to={routes.requestPasswordReset()}>
        <StyledButton color="default" fullWidth variant="text">
          {'Forgot Password?'}
        </StyledButton>
      </Link>
    </StyledAuthForm>
  </AuthLayout>
)

export default compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('info', 'setInfo', null),
  withHandlers({
    loginSubmit: ({ loginForm, setInfo }) => async event => {
      event.preventDefault()
      await apiSignIn({ user: { email: loginForm.email, password: loginForm.password } }, setInfo)
      if (auth.isLoggedIn()) {
        window.location.href = routes.root()
      }
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(Login)
