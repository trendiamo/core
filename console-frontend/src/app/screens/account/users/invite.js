import CircularProgress from 'shared/circular-progress'
import React, { useCallback, useMemo, useRef } from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import useAppBarContent from 'ext/hooks/use-app-bar-content'
import useForm from 'ext/hooks/use-form'
import { Actions, Field, Form, Select } from 'shared/form-elements'
import { apiRequest, apiUserInvite } from 'utils'
import { useSnackbar } from 'notistack'
import { withRouter } from 'react-router'

const formObjectTransformer = json => {
  return {
    role: json.role || '',
    email: json.email || '',
  }
}

const loadFormObject = () => {
  return {
    role: 'owner',
    email: '',
  }
}

const roleOptions = ['Editor', 'Owner']

const UserInvite = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar()

  const formRef = useRef()

  const saveFormObject = useCallback(
    async form => {
      const { json, errors, requestError } = await apiRequest(apiUserInvite, [{ invite: form }])

      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) enqueueSnackbar('Sent the invite!', { variant: 'success' })
      return json
    },
    [enqueueSnackbar]
  )

  const { form, isFormLoading, isFormPristine, isFormSubmitting, onFormSubmit, setFieldValue } = useForm({
    formObjectTransformer,
    loadFormObject,
    saveFormObject,
  })

  const newOnFormSubmit = useCallback(
    event => {
      return (async () => {
        if (!formRef.current.reportValidity()) return
        const result = await onFormSubmit(event)
        if (!result || result.error || result.errors) return
        history.push(routes.settingsAccount())
        return result
      })()
    },
    [history, onFormSubmit]
  )

  const appBarContent = useMemo(
    () => ({
      Actions: (
        <Actions
          isFormPristine={isFormPristine}
          isFormSubmitting={isFormSubmitting}
          message="Invite"
          onFormSubmit={newOnFormSubmit}
          saveDisabled={isFormSubmitting || isFormLoading || isFormPristine}
        />
      ),
      backRoute: routes.settingsAccount(),
      title: 'Invite User',
    }),
    [isFormLoading, isFormPristine, isFormSubmitting, newOnFormSubmit]
  )
  useAppBarContent(appBarContent)

  if (isFormLoading) return <CircularProgress />

  return (
    <Section title="Invite User">
      <Form formRef={formRef} isFormPristine={isFormPristine} onSubmit={newOnFormSubmit}>
        <Field
          autoFocus
          disabled={isFormLoading}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          onChange={setFieldValue}
          required
          type="email"
          value={form.email}
        />
        <Select
          disabled={isFormLoading}
          fullWidth
          label="Role"
          margin="normal"
          name="role"
          onChange={setFieldValue}
          options={roleOptions}
          required
          value={form.role}
        />
      </Form>
    </Section>
  )
}

export default withRouter(UserInvite)
