import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import Link from 'shared/link'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import { apiPasswordEmailLink, apiRequest, showUpToUsBranding } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Field } from 'shared/form-elements'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const AuthMessage = () => (
  <>
    <AuthTitle variant="h4">
      {"Don't have an account?"}
      <br />
      {'Get to know what we can do for you.'}
    </AuthTitle>
    <AuthText style={{ color: '#fff', marginBottom: '10px' }} variant="body2">
      {'Is something wrong? '}
      <AuthLink href="mailto:support@trendiamo.com">{'Get in touch!'}</AuthLink>
    </AuthText>
    <AuthLink href="https://frekkls.com">
      <AuthButton>{'Learn about Frekkls'}</AuthButton>
    </AuthLink>
  </>
)

const PasswordReset = ({ passwordForm, passwordChangeSubmit, setPasswordFormValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordChangeSubmit}>
      <Typography style={{ marginTop: '10px' }} variant="body2">
        {'We can help you reset your password using your email address linked to your account.'}
      </Typography>
      <Field
        autoFocus
        label="E-mail"
        name="email"
        onChange={setPasswordFormValue}
        required
        type="email"
        value={passwordForm.email}
      />
      <div style={{ marginTop: '1rem' }}>
        <Button color="primaryGradient" type="submit" variant="contained">
          {'Send Reset Instructions'}
        </Button>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Link to={routes.login()}>
          <Button
            color={showUpToUsBranding() ? 'white' : 'primaryText'}
            variant={showUpToUsBranding() ? 'contained' : 'text'}
          >
            {'Back to Login'}
          </Button>
        </Link>
      </div>
    </form>
  </AuthLayout>
)

const PasswordReset1 = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({ email: '' })

  const passwordChangeSubmit = useCallback(
    async event => {
      event.preventDefault()
      const { json, requestError } = await apiRequest(apiPasswordEmailLink, [{ user: { email: passwordForm.email } }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (!requestError) {
        mixpanel.track('Requested Password Change', { hostname: window.location.hostname })
        enqueueSnackbar('Email sent!', { variant: 'info' })
      }
      return json
    },
    [enqueueSnackbar, passwordForm.email]
  )

  const setPasswordFormValue = useCallback(
    event =>
      setPasswordForm({
        ...passwordForm,
        [event.target.name]: event.target.value,
      }),
    [passwordForm, setPasswordForm]
  )

  return (
    <PasswordReset
      passwordChangeSubmit={passwordChangeSubmit}
      passwordForm={passwordForm}
      setPasswordFormValue={setPasswordFormValue}
    />
  )
}

export default PasswordReset1
