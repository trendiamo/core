import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import Link from 'shared/link'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'app/routes'
import { apiRequest, apiSignIn } from 'utils'
import { AuthStyledForm } from 'auth/components'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const Login = ({ loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout title="Let's log you in!">
    <AuthStyledForm onSubmit={loginSubmit}>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="email">{'E-mail'}</InputLabel>
        <Input
          autoComplete="email"
          autoFocus
          id="email"
          name="email"
          onChange={setLoginValue}
          required
          type="email"
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
      <div style={{ marginTop: '2rem', width: '70%' }}>
        <Button color="primaryGradient" fullWidth type="submit" variant="contained">
          {'Login'}
        </Button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={routes.requestPasswordReset()}>
          <Button color="primaryText" variant="text">
            {'Forgot Password?'}
          </Button>
        </Link>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {"Don't have an account? "}
        <Link to={routes.signup()}>{'Signup'}</Link>
      </div>
    </AuthStyledForm>
  </AuthLayout>
)

const Login1 = () => {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(
    () => {
      if (window.location.hash === '#confirmed')
        enqueueSnackbar('Your e-mail was successfully verified!', { variant: 'success' })
      if (window.location.hash === '#error')
        enqueueSnackbar('There was a problem with your email verification', { variant: 'error' })
    },
    [enqueueSnackbar]
  )

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  const loginSubmit = useCallback(
    event => {
      ;(async () => {
        event.preventDefault()
        const { json, errors, requestError } = await apiRequest(
          apiSignIn,
          [{ user: { email: loginForm.email, password: loginForm.password } }],
          { isLoginRequest: true }
        )
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!requestError && !errors) auth.setUser(json.user)
        if (auth.isLoggedIn()) {
          window.location.href = routes.root()
        }
      })()
    },
    [enqueueSnackbar, loginForm.email, loginForm.password]
  )

  const setLoginValue = useCallback(event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value }), [
    loginForm,
  ])

  return <Login loginForm={loginForm} loginSubmit={loginSubmit} setLoginValue={setLoginValue} />
}

export default Login1
