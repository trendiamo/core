import auth from 'auth'
import AuthLayout from 'auth/layout'
import queryString from 'query-string'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import { apiPasswordReset, apiRequest } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const AuthMessage = () => (
  <React.Fragment>
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
  </React.Fragment>
)

const PasswordReset = ({ passwordForm, passwordResetSubmit, setFieldValue }) => (
  <AuthLayout authMessage={<AuthMessage />} title="Reset Password">
    <form onSubmit={passwordResetSubmit}>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="email">{'New Password'}</InputLabel>
        <Input
          autoFocus
          id="email"
          name="fieldOne"
          onChange={setFieldValue}
          required
          type="password"
          value={passwordForm.fieldOne}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel htmlFor="password">{'Repeat Password'}</InputLabel>
        <Input
          id="password"
          name="fieldTwo"
          onChange={setFieldValue}
          required
          type="password"
          value={passwordForm.fieldTwo}
        />
      </FormControl>
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" type="submit" variant="contained">
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
    event => {
      ;(async () => {
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
      })()
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
