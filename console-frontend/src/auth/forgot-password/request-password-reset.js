import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import { apiPasswordEmailLink, apiRequest, showUpToUsBranding } from 'utils'
import { Field, Fieldset } from 'shared/form-elements'
import { Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const PasswordReset = withRouter(
  ({ isSubmitting, history, passwordForm, passwordChangeSubmit, setPasswordFormValue }) => {
    const onLoginClick = useCallback(() => {
      history.push(routes.login())
    }, [history])

    return (
      <AuthLayout title="Reset Password">
        <form onSubmit={passwordChangeSubmit}>
          <Fieldset disabled={isSubmitting}>
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
              <Button
                color="primaryGradient"
                disabled={isSubmitting}
                isFormSubmitting={isSubmitting}
                type="submit"
                variant="contained"
              >
                {'Send Reset Instructions'}
              </Button>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Button
                color={showUpToUsBranding() ? 'white' : 'primaryText'}
                onClick={onLoginClick}
                variant={showUpToUsBranding() ? 'contained' : 'text'}
              >
                {'Back to Login'}
              </Button>
            </div>
          </Fieldset>
        </form>
      </AuthLayout>
    )
  }
)

const PasswordReset1 = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({ email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordChangeSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsSubmitting(true)
      const { json, requestError } = await apiRequest(apiPasswordEmailLink, [{ user: { email: passwordForm.email } }])
      if (requestError) {
        enqueueSnackbar(requestError, { variant: 'error' })
      } else {
        mixpanel.track('Requested Password Change', { hostname: window.location.hostname })
        enqueueSnackbar('Email sent!', { variant: 'info' })
      }
      setIsSubmitting(false)
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
      isSubmitting={isSubmitting}
      passwordChangeSubmit={passwordChangeSubmit}
      passwordForm={passwordForm}
      setPasswordFormValue={setPasswordFormValue}
    />
  )
}

export default PasswordReset1
