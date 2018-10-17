import { apiSignIn } from '../../auth/utils'
import AuthLayout from '../auth-layout'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { compose, withHandlers, withState } from 'recompose'
import { StyledButton, StyledForm } from '../shared'

const CustomLoginJSX = ({ errors, loginForm, loginSubmit, setLoginValue, onForgotPassword }) => (
  <AuthLayout title="Log in">
    <StyledForm onSubmit={loginSubmit}>
      {errors && (
        <Typography align="center" color="error" variant="body2">
          <div>{errors}</div>
        </Typography>
      )}
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
      <StyledButton color="primary" fullWidth type="submit" variant="raised">
        {'Log in'}
      </StyledButton>
      <StyledButton color="secondary" fullWidth onClick={onForgotPassword} type="submit" variant="raised">
        {'Forgot Password'}
      </StyledButton>
    </StyledForm>
  </AuthLayout>
)

const CustomLogin = compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('errors', 'setErrors', null),
  withHandlers({
    loginSubmit: ({ loginForm, setErrors }) => async event => {
      event.preventDefault()
      await apiSignIn({ user: { email: loginForm.email, password: loginForm.password } }, setErrors)
      if (localStorage.authToken && localStorage.authEmail) {
        window.location.href = '/'
      }
    },
    onForgotPassword: () => event => {
      event.preventDefault()
      window.location.href = '/request_password_reset'
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(CustomLoginJSX)

export default CustomLogin
