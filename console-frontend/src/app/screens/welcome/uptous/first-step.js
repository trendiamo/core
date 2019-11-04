import auth from 'auth'
import Button from 'shared/button'
import Link from 'shared/link'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { apiMeUpdate, apiRequest } from 'utils'
import { Checkbox, Field } from 'shared/form-elements'
import { Form } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const FormFooter = styled.div`
  padding-top: 1.5rem;
`

const socialMediaUrlInputProps = { pattern: 'https?://.+' }

const FirstStep = ({ setWelcomeStep }) => {
  const [form, setForm] = useState({
    socialMediaUrl: '',
    referredByCode: window.localStorage.getItem('signup-aftk') || '',
    acceptsTermsAndConditions: false,
  })
  const setFormValue = useCallback(event => setForm({ ...form, [event.target.name]: event.target.value }), [form])
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const toggleAcceptsTermsAndConditions = useCallback(
    value => {
      setForm({ ...form, acceptsTermsAndConditions: value })
    },
    [form]
  )

  const onFormSubmit = useCallback(
    async event => {
      event.preventDefault()
      setIsFormSubmitting(true)
      window.localStorage.removeItem('signup-aftk')
      const { json, errors, requestError } = await apiRequest(apiMeUpdate, [{ user: form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        auth.setUser(json)
        setWelcomeStep(2)
        return
      }
      setIsFormSubmitting(false)
    },
    [enqueueSnackbar, form, setWelcomeStep]
  )

  return (
    <Form isFormPristine onSubmit={onFormSubmit}>
      <Typography>{'Please provide information about the platform that you consider your main account:'}</Typography>
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
      <Field
        label="Referral Code (optional)"
        name="referredByCode"
        onChange={setFormValue}
        value={form.referredByCode}
      />
      <Checkbox
        label={
          <p>
            {'I accept the '}
            <Link href={routes.termsAndConditions()} rel="noopener noreferrer" target="_blank">
              {'Terms and Conditions'}
            </Link>
            {', '}
            <Link href={routes.privacyPolicy()} rel="noopener noreferrer" target="_blank">
              {'Privacy Policy'}
            </Link>
            {' and the '}
            <Link href={routes.cookiePolicy()} rel="noopener noreferrer" target="_blank">
              {'Cookie Policy'}
            </Link>
            {'.'}
          </p>
        }
        onChange={toggleAcceptsTermsAndConditions}
        required
        value={form.acceptsTermsAndConditions}
      />
      <FormFooter>
        <Button
          color="primaryGradient"
          disabled={isFormSubmitting}
          isFormSubmitting={isFormSubmitting}
          type="submit"
          variant="contained"
        >
          {'Next'}
        </Button>
      </FormFooter>
    </Form>
  )
}

export default FirstStep
