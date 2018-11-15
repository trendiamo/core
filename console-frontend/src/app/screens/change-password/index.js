import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Notification from 'shared/notification'
import PaperContainer from 'app/layout/paper-container'
import React from 'react'
import routes from 'app/routes'
import withRaTitle from 'ext/recompose/with-ra-title'
import { apiPasswordChange } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { withRouter } from 'react-router'

const ChangePassword = ({ info, passwordForm, passwordResetSubmit, setFieldValue }) => (
  <PaperContainer>
    <form onSubmit={passwordResetSubmit}>
      <Notification data={info} />
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
      <div style={{ marginTop: '1rem' }}>
        <Button color="primary" type="submit" variant="contained">
          {'Reset'}
        </Button>
      </div>
    </form>
  </PaperContainer>
)

export default compose(
  withRaTitle('Change Password'),
  withState('passwordForm', 'setPasswordForm', {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }),
  withState('info', 'setInfo', null),
  withRouter,
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setInfo, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password === passwordForm.passwordConfirmation) {
        const success = await apiPasswordChange(
          {
            user: {
              current_password: passwordForm.currentPassword,
              password: passwordForm.password,
              password_confirmation: passwordForm.passwordConfirmation,
            },
          },
          setInfo
        )
        if (success) history.push(routes.root())
      } else {
        setInfo({ message: "New passwords don't match", status: 'error' })
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
  })
)(ChangePassword)
