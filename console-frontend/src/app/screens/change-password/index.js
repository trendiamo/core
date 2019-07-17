import auth from 'auth'
import Button from 'shared/button'
import React, { useCallback, useMemo, useState } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import { apiPasswordChange, apiRequest } from 'utils'
import { FormControl, Input, InputLabel } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const Actions = ({ onFormSubmit }) => (
  <Button color="primaryGradient" onClick={onFormSubmit} type="submit" variant="contained">
    {'Reset'}
  </Button>
)

const ChangePassword = ({ passwordForm, onFormSubmit, setFieldValue }) => (
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

const ChangePassword1 = ({ history, ...props }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  const onFormSubmit = useCallback(
    event => {
      ;(async () => {
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
          const user = auth.getUser()
          const accountSlugs = !user.admin && Object.keys(user.roles)
          if (auth.isSingleAccount()) {
            return history.push(routes.root(accountSlugs[0]))
          }
          history.push(routes.accounts())
        }
      })()
    },
    [enqueueSnackbar, history, passwordForm]
  )

  const setFieldValue = useCallback(
    event => {
      event.preventDefault()
      setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value })
    },
    [passwordForm, setPasswordForm]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: <Actions onFormSubmit={onFormSubmit} />,
      backRoute: (() => {
        const user = auth.getUser()
        const accountSlugs = !user.admin && Object.keys(user.roles)
        if (auth.isSingleAccount()) {
          return routes.root(accountSlugs[0])
        }
        return routes.accounts()
      })(),
      title: 'Change Password',
    }),
    [onFormSubmit]
  )
  useAppBarContent(appBarContent)

  return (
    <ChangePassword {...props} onFormSubmit={onFormSubmit} passwordForm={passwordForm} setFieldValue={setFieldValue} />
  )
}

export default withRouter(ChangePassword1)
