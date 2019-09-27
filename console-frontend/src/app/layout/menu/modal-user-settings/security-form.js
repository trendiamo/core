import ActionContainer from './action-container'
import Button from 'shared/button'
import React, { useCallback, useMemo, useState } from 'react'
import { apiPasswordChange, apiRequest } from 'utils'
import { Field } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const SecurityForm = ({ passwordForm, onFormSubmit, setFieldValue, isResetButtonDisabled }) => (
  <form onSubmit={onFormSubmit}>
    <Field
      autoFocus
      label="Current Password"
      name="currentPassword"
      onChange={setFieldValue}
      required
      type="password"
      value={passwordForm.currentPassword}
    />
    <Field
      label="New Password"
      name="password"
      onChange={setFieldValue}
      required
      type="password"
      value={passwordForm.password}
    />
    <Field
      label="Repeat Password"
      name="passwordConfirmation"
      onChange={setFieldValue}
      required
      type="password"
      value={passwordForm.passwordConfirmation}
    />
    <ActionContainer>
      <Button
        color="primaryGradient"
        disabled={isResetButtonDisabled}
        inline
        onClick={onFormSubmit}
        type="submit"
        variant="contained"
      >
        {'Reset'}
      </Button>
    </ActionContainer>
  </form>
)

const SecurityForm1 = ({ handleClose, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const isResetButtonDisabled = useMemo(
    () =>
      passwordForm.currentPassword === '' || passwordForm.password === '' || passwordForm.passwordConfirmation === '',
    [passwordForm.currentPassword, passwordForm.password, passwordForm.passwordConfirmation]
  )

  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      if (passwordForm.password !== passwordForm.passwordConfirmation) {
        enqueueSnackbar("Passwords don't match", { variant: 'error' })
        return
      }
      const { errors, requestError } = await apiRequest(apiPasswordChange, [{ user: passwordForm }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        enqueueSnackbar('Changed Password', { variant: 'success' })
        handleClose()
      }
    },
    [enqueueSnackbar, handleClose, passwordForm]
  )

  const setFieldValue = useCallback(
    event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
    [passwordForm, setPasswordForm]
  )

  return (
    <SecurityForm
      {...props}
      isResetButtonDisabled={isResetButtonDisabled}
      onFormSubmit={onFormSubmit}
      passwordForm={passwordForm}
      setFieldValue={setFieldValue}
    />
  )
}

export default SecurityForm1
