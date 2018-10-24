import { apiSignIn } from '../../auth/utils'
import auth from 'app/auth'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import { compose, withHandlers, withState } from 'recompose'
import { Notification, StyledButton, StyledForm } from '../shared'

const Login = ({ info, loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout title="Log in">
    <StyledForm onSubmit={loginSubmit}>
      <Notification data={info} />
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="email">{'Email Address'}</InputLabel>
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
        {'Log in'}
      </StyledButton>
      <Link to={routes.requestPasswordReset()}>
        <StyledButton color="default" fullWidth variant="text">
          {'Forgot Password'}
        </StyledButton>
      </Link>
    </StyledForm>
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
