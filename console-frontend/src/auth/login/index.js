import auth from 'auth'
import AuthFormFooter from 'auth/form-footer'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import GoogleAuthButton from 'shared/google/auth-button'
import Link from 'shared/link'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'app/routes'
import { apiRequest, apiSignIn, showUpToUsBranding } from 'utils'
import { Field, Fieldset } from 'shared/form-elements'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const Footer = ({ isSubmitting }) => (
  <AuthFormFooter>
    <div>
      <Button
        color="primaryGradient"
        disabled={isSubmitting}
        isFormSubmitting={isSubmitting}
        type="submit"
        variant="contained"
      >
        {'Login'}
      </Button>
      <Link to={routes.requestPasswordReset()}>
        <Button
          color={showUpToUsBranding() ? 'white' : 'primaryText'}
          inline
          variant={showUpToUsBranding() ? 'contained' : 'text'}
        >
          {'Forgot password?'}
        </Button>
      </Link>
    </div>
    <Typography variant="body2">
      {"Don't have an account? "}
      <Link to={routes.signup()}>{'Signup here'}</Link>
    </Typography>
  </AuthFormFooter>
)

const Login = ({ isSubmitting, loginForm, loginSubmit, setLoginValue }) => (
  <AuthLayout title={!showUpToUsBranding() && "Let's log you in!"}>
    <GoogleAuthButton text="Sign in with Google" />
    <form onSubmit={loginSubmit}>
      <Fieldset disabled={isSubmitting}>
        <Field
          autoComplete="email"
          autoFocus
          label="E-mail"
          name="email"
          onChange={setLoginValue}
          required
          type="email"
          value={loginForm.email}
        />
        <Field
          autoComplete="current-password"
          label="Password"
          name="password"
          onChange={setLoginValue}
          required
          type="password"
          value={loginForm.password}
        />
        <Footer isSubmitting={isSubmitting} />
      </Fieldset>
    </form>
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
      if (window.location.hash === '#invite-accepted')
        enqueueSnackbar('You accepted the invitation, please login to see your new account!', { variant: 'success' })
      if (window.location.hash === '#invalid-invite')
        enqueueSnackbar('The invitation is no longer available', { variant: 'error' })
      if (window.location.hash === '#invite-error')
        enqueueSnackbar('There was a problem with your invitation', { variant: 'error' })
    },
    [enqueueSnackbar]
  )

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loginSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsSubmitting(true)
      const { json, errors, requestError } = await apiRequest(
        apiSignIn,
        [{ user: { email: loginForm.email, password: loginForm.password } }],
        { isLoginRequest: true }
      )
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) auth.setUser(json.user)
      if (auth.isLoggedIn()) {
        mixpanel.identify(json.user.id)
        mixpanel.people.set({
          $email: json.user.email,
          $first_name: json.user.firstName,
          $last_name: json.user.lastName,
          $created: json.user.createdAt,
          'Social Media URL': json.user.socialMediaUrl,
        })
        mixpanel.track('Logged In', { hostname: window.location.hostname })
        window.location.href = auth.isAffiliate() && !auth.getUser().socialMediaUrl ? routes.welcome() : routes.root()
      } else {
        setIsSubmitting(false)
      }
    },
    [enqueueSnackbar, loginForm.email, loginForm.password]
  )

  const setLoginValue = useCallback(event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value }), [
    loginForm,
  ])

  return (
    <Login isSubmitting={isSubmitting} loginForm={loginForm} loginSubmit={loginSubmit} setLoginValue={setLoginValue} />
  )
}

export default Login1
