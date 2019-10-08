import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { apiMeUpdate, apiRequest } from 'utils'
import { Field, Form } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const socialMediaUrlInputProps = { pattern: 'https?://.+' }

const FormFooter = styled.div`
  padding-top: 1.5rem;
`

const SideContent = () => (
  <>
    <h2>{'Just One Last Step'}</h2>
    <p>{'Provide information about your social media accounts so we can connect you with brands that fit you best.'}</p>
  </>
)

const WelcomePage = () => {
  const [form, setForm] = useState({ socialMediaUrl: '' })
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const setFormValue = useCallback(event => setForm({ ...form, [event.target.name]: event.target.value }), [form])

  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsFormSubmitting(true)
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        auth.setUser(json)
        window.location.href = routes.root()
      }
      setIsFormSubmitting(false)
    },
    [enqueueSnackbar, form]
  )

  return (
    <AuthLayout SideContent={SideContent}>
      <Typography>{'Please provide information about the platform that you consider your main account:'}</Typography>
      <Form onSubmit={onFormSubmit}>
        <Field
          autoFocus
          disabled={isFormSubmitting}
          fullWidth
          inputProps={socialMediaUrlInputProps}
          label="Social Media URL"
          margin="normal"
          name="socialMediaUrl"
          onChange={setFormValue}
          required
          value={form.socialMediaUrl}
        />
        <FormFooter>
          <Button
            color="primaryGradient"
            disabled={isFormSubmitting}
            isFormSubmitting={isFormSubmitting}
            type="submit"
            variant="contained"
          >
            {'Done'}
          </Button>
        </FormFooter>
      </Form>
    </AuthLayout>
  )
}

export default WelcomePage
