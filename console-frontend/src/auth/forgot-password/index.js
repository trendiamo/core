import auth from 'auth'
import AuthLayout from 'auth/layout'
import queryString from 'query-string'
import React from 'react'
import routes from 'app/routes'
import { apiPasswordReset, apiRequest } from 'utils'
import { AuthButton, AuthLink, AuthText, AuthTitle } from 'auth/components'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
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

const PasswordReset1 = compose(
  withState('passwordForm', 'setPasswordForm', {
    fieldOne: '',
    fieldTwo: '',
  }),
  withHandlers({
    passwordResetSubmit: ({ enqueueSnackbar, passwordForm }) => async event => {
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
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(PasswordReset)

const PasswordReset2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <PasswordReset1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default PasswordReset2
