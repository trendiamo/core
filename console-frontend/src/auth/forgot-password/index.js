import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import queryString from 'query-string'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import { apiPasswordReset, apiRequest } from 'utils'
import { Field, Fieldset } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const PasswordReset = ({ isSubmitting, passwordForm, passwordResetSubmit, setFieldValue }) => (
  <AuthLayout title="Reset Password">
    <form onSubmit={passwordResetSubmit}>
      <Fieldset disabled={isSubmitting}>
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
          <Button
            color="primaryGradient"
            disabled={isSubmitting}
            isFormSubmitting={isSubmitting}
            type="submit"
            variant="contained"
          >
            {'Reset'}
          </Button>
        </div>
      </Fieldset>
    </form>
  </AuthLayout>
)

const PasswordReset1 = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({
    fieldOne: '',
    fieldTwo: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const passwordResetSubmit = useCallback(
    async event => {
      event.preventDefault()
      if (passwordForm.fieldOne !== passwordForm.fieldTwo) {
        enqueueSnackbar("Passwords don't match", { variant: 'error' })
        return
      }
      const parsedUrl = queryString.parse(window.location.search)
      setIsSubmitting(true)
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
      if (auth.isLoggedIn()) {
        window.location.href = routes.root()
      } else {
        setIsSubmitting(false)
      }
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
      isSubmitting={isSubmitting}
      passwordForm={passwordForm}
      passwordResetSubmit={passwordResetSubmit}
      setFieldValue={setFieldValue}
    />
  )
}

export default PasswordReset1
