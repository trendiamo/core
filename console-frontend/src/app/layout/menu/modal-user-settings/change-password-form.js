import Button from 'shared/button'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import WhiteButton from 'shared/white-button'
import { apiPasswordChange, apiRequest } from 'utils'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const ActionContainer = styled.div`
  margin: 16px 0 10px;
`

const ChangePassword = ({ passwordForm, onFormSubmit, setFieldValue, togglePasswordForm, isResetButtonDisabled }) => (
  <form onSubmit={onFormSubmit}>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="currentPassword">{'Current Password'}</InputLabel>
      <Input
        autoFocus
        name="currentPassword"
        onChange={setFieldValue}
        required
        type="password"
        value={passwordForm.currentPassword}
      />
    </FormControl>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="password">{'New Password'}</InputLabel>
      <Input name="password" onChange={setFieldValue} required type="password" value={passwordForm.password} />
    </FormControl>
    <FormControl fullWidth margin="normal" required>
      <InputLabel htmlFor="passwordConfirmation">{'Repeat Password'}</InputLabel>
      <Input
        name="passwordConfirmation"
        onChange={setFieldValue}
        required
        type="password"
        value={passwordForm.passwordConfirmation}
      />
    </FormControl>
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
      <WhiteButton inline onClick={togglePasswordForm} variant="contained">
        {'Cancel'}
      </WhiteButton>
    </ActionContainer>
  </form>
)

const ChangePassword1 = ({ handleClose, ...props }) => {
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
    <ChangePassword
      {...props}
      isResetButtonDisabled={isResetButtonDisabled}
      onFormSubmit={onFormSubmit}
      passwordForm={passwordForm}
      setFieldValue={setFieldValue}
    />
  )
}

export default ChangePassword1
