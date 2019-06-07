import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import Link from 'shared/link'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiAccountsShow, apiRequest, apiSignIn } from 'utils'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 900px) {
    display: block;
  }
`

const Login = ({ loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout title="Let's log you in!">
    <StyledForm onSubmit={loginSubmit}>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="email">{'E-mail'}</InputLabel>
        <Input
          autoComplete="email"
          autoFocus
          id="email"
          name="email"
          onChange={setLoginValue}
          required
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
    </StyledForm>
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

  const requestSessionAccount = useCallback(async accountId => {
    const { json } = await apiRequest(apiAccountsShow, [accountId])
    return json
  }, [])

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
        const accountIds = json.user && !json.user.admin && Object.keys(json.user.roles)
        if (auth.isLoggedIn()) {
          if (auth.isSingleAccount()) {
            const account = await requestSessionAccount(accountIds[0])
            auth.setSessionAccount(account)
            auth.setSessionRole(json.user.roles[accountIds[0]])
            return (window.location.href = routes.root())
          }
          window.location.href = routes.accounts()
        }
      })()
    },
    [enqueueSnackbar, loginForm.email, loginForm.password, requestSessionAccount]
  )

  const setLoginValue = useCallback(event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value }), [
    loginForm,
  ])

  return <Login loginForm={loginForm} loginSubmit={loginSubmit} setLoginValue={setLoginValue} />
}

export default Login1
