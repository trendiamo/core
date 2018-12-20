import Notification from 'shared/notification'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import withAppBarContent from 'ext/recompose/with-app-bar-content'
import { apiPasswordChange } from 'utils'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
import { extractErrors } from 'utils/shared'
import { withRouter } from 'react-router'

const Actions = ({ onFormSubmit }) => (
  <Button color="primary" onClick={onFormSubmit} type="submit" variant="contained">
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
  withHandlers({
    onFormSubmit: ({ passwordForm, setErrors, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password !== passwordForm.passwordConfirmation) {
        setErrors({ message: "New passwords don't match", status: 'error' })
        return
      }
      const json = await apiPasswordChange({
        user: passwordForm,
      })
      const errors = extractErrors(json)
      if (errors) {
        setErrors(errors)
      } else {
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
    breadcrumbs: [{ route: routes.account(), text: 'Account' }, { text: 'Change Password' }],
  }))
)(ChangePassword)
