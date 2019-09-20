import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import queryString from 'query-string'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import { apiPasswordReset, apiRequest } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Field } from 'shared/form-elements'
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

const PasswordReset = ({ passwordForm, passwordResetSubmit, setFieldValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordResetSubmit}>
      <Field
        autoFocus
        label="New Password"
        name="fieldOne"
        onChange={setFieldValue}
        required
        type="password"
        value={passwordForm.fieldOne}
      />
      <Field
        label="Repeat Password"
        name="fieldTwo"
        onChange={setFieldValue}
        required
        type="password"
        value={passwordForm.fieldTwo}
      />
      <div style={{ marginTop: '1rem' }}>
        <Button color="primaryGradient" type="submit" variant="contained">
          {'Reset'}
        </Button>
      </div>
    </form>
  </AuthLayout>
)

const PasswordReset1 = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({
    fieldOne: '',
    fieldTwo: '',
  })

  const passwordResetSubmit = useCallback(
    async event => {
      event.preventDefault()
      if (passwordForm.fieldOne !== passwordForm.fieldTwo) {
        enqueueSnackbar("Passwords don't match", { variant: 'error' })
        return
      }
      const parsedUrl = queryString.parse(window.location.search)
      const { json, errors, requestError } = await apiRequest(apiPasswordReset, [
        {
          user: {
            password: passwordForm.fieldTwo,
            reset_password_token: parsedUrl.reset_password_token,
          },
        },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) auth.setUser(json.user)
      if (auth.isLoggedIn()) window.location.href = routes.root()
    },
    [enqueueSnackbar, passwordForm.fieldOne, passwordForm.fieldTwo]
  )

  const setFieldValue = useCallback(
    event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
    [passwordForm]
  )

  return (
    <PasswordReset
      passwordForm={passwordForm}
      passwordResetSubmit={passwordResetSubmit}
      setFieldValue={setFieldValue}
    />
  )
}

export default PasswordReset1
