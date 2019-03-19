import Button from 'shared/button'
import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiPasswordChange, apiRequest } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { withRouter } from 'react-router'
import { withSnackbar } from 'notistack'

const Actions = ({ onFormSubmit }) => (
  <Button color="primaryGradient" onClick={onFormSubmit} type="submit" variant="contained">
    {'Reset'}
  </Button>
)

const ChangePassword = ({ errors, passwordForm, onFormSubmit, setFieldValue }) => (
  <Section title="Change Password">
    <form onSubmit={onFormSubmit}>
      <Notification data={errors} />
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
        <Input name="password" onChange={setFieldValue} type="password" value={passwordForm.password} />
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
    </form>
  </Section>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }),
  withState('errors', 'setErrors', null),
  withRouter,
  withSnackbar,
  withHandlers({
    onFormSubmit: ({ enqueueSnackbar, passwordForm, setErrors, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password !== passwordForm.passwordConfirmation) {
        setErrors({ message: "New passwords don't match", status: 'error' })
        return
      }
      const { errors, requestError } = await apiRequest(apiPasswordChange, [{ user: passwordForm }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) setErrors(errors)
      if (!requestError && !errors) {
        enqueueSnackbar('Changed Password', { variant: 'Info' })
        history.push(routes.root())
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
  }),
  withAppBarContent(({ onFormSubmit }) => ({
    Actions: <Actions onFormSubmit={onFormSubmit} />,
    backRoute: routes.account(),
    title: 'Change Password',
  }))
)(ChangePassword)
