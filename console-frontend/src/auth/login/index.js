import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import Link from 'shared/link'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiRequest, apiSignIn } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { withSnackbar } from 'notistack'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 900px) {
    display: block;
  }
`

const Login = ({ errors, loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout title="Let's log you in!">
    <StyledForm onSubmit={loginSubmit}>
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
