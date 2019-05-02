import Button from 'shared/button'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiPasswordChange, apiRequest } from 'utils'
import { compose, withHandlers, withState } from 'recompose'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const Actions = ({ onFormSubmit }) => (
  <Button color="primaryGradient" onClick={onFormSubmit} type="submit" variant="contained">
    {'Reset'}
  </Button>
)

const ChangePassword = ({ passwordForm, onFormSubmit, setFieldValue }) => {
  const appBarContent = {
    Actions: <Actions onFormSubmit={onFormSubmit} />,
    backRoute: routes.account(),
    title: 'Change Password',
  }
  useAppBarContent(appBarContent)
  return (
    <Section title="Change Password">
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
      </form>
    </Section>
  )
}

const ChangePassword1 = compose(
  withState('passwordForm', 'setPasswordForm', {
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  }),
  withRouter,
  withHandlers({
    onFormSubmit: ({ enqueueSnackbar, passwordForm, history }) => async event => {
      event.preventDefault()
      if (passwordForm.password !== passwordForm.passwordConfirmation) {
        enqueueSnackbar("Passwords don't match", { variant: 'error' })
        return
      }
      const { errors, requestError } = await apiRequest(apiPasswordChange, [{ user: passwordForm }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        enqueueSnackbar('Changed Password', { variant: 'Info' })
        history.push(routes.root())
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
  })
)(ChangePassword)

const ChangePassword2 = props => {
  const { enqueueSnackbar } = useSnackbar()
  return <ChangePassword1 {...props} enqueueSnackbar={enqueueSnackbar} />
}

export default ChangePassword2
