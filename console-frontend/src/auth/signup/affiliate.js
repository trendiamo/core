import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import DoneIcon from '@material-ui/icons/Done'
import Link from 'shared/link'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiRequest, apiSignUp } from 'utils'
import { AuthFormFooter, AuthStyledForm } from 'auth/components'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { Field } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const socialMediaUrlInputProps = { pattern: 'https?://.+' }

const StyledDoneIcon = styled(DoneIcon)`
  color: #15c29d;
  width: 100%;
  height: 8rem;
`

const AffiliateSignup = () => {
  const passwordRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'setFormSubmitted') {
        return { ...state, isFormSubmitted: action.value }
      } else {
        throw new Error()
      }
    },
    {
      form: {
        affiliateRole: 'promoter',
        firstName: '',
        lastName: '',
        socialMediaUrl: '',
        referredByCode: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        acceptsTermsAndConditions: false,
      },
      isFormSubmitted: false,
    }
  )

  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const setFormSubmitted = useCallback(value => dispatch({ type: 'setFormSubmitted', value }), [dispatch])

  const setFieldValue = useCallback(event => mergeForm({ [event.target.name]: event.target.value }), [mergeForm])
  const StyledLink = styled.a`
    color: #128976;
    text-decoration: none;
  `

  useEffect(
    () => {
      if (!passwordRef.current) return
      if (state.form.password !== state.form.passwordConfirmation) {
        passwordRef.current.setCustomValidity('Passwords do not match')
      } else {
        passwordRef.current.setCustomValidity('')
      }
    },
    [setFieldValue, state.form.password, state.form.passwordConfirmation]
  )

  const toggleAcceptsTermsAndConditions = useCallback(
    event => {
      mergeForm({ acceptsTermsAndConditions: event.target.checked })
    },
    [mergeForm]
  )

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()

      const { errors, requestError } = await apiRequest(apiSignUp, [{ user: state.form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        mixpanel.track('Signed Up', { hostname: window.location.hostname })
        setFormSubmitted(true)
      }
    },
    [enqueueSnackbar, setFormSubmitted, state.form]
  )

  return (
    <AuthLayout title="Start monetizing positive influence">
      {state.isFormSubmitted ? (
        <>
          <StyledDoneIcon />
          <div>{'Confirmation e-mail sent. Please confirm your account by following the link there.'}</div>
        </>
      ) : (
        <AuthStyledForm onSubmit={onSubmit}>
          <Field
            autoFocus
            label="First Name"
            name="firstName"
            onChange={setFieldValue}
            required
            value={state.form.firstName}
          />
          <Field label="Last Name" name="lastName" onChange={setFieldValue} required value={state.form.lastName} />
          <Field
            inputProps={socialMediaUrlInputProps}
            label="Primary Social Media URL"
            name="socialMediaUrl"
            onChange={setFieldValue}
            required
            type="url"
            value={state.form.socialMediaUrl}
          />
          <Field
            label="Referral Code (optional)"
            name="referredByCode"
            onChange={setFieldValue}
            value={state.form.referredByCode}
          />
          <Field
            autoComplete="email"
            label="E-mail"
            name="email"
            onChange={setFieldValue}
            required
            type="email"
            value={state.form.email}
          />
          <Field
            inputRef={passwordRef}
            label="Password"
            name="password"
            onChange={setFieldValue}
            required
            type="password"
            value={state.form.password}
          />
          <Field
            label="Confirm Password"
            name="passwordConfirmation"
            onChange={setFieldValue}
            required
            type="password"
            value={state.form.passwordConfirmation}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.form.acceptsTermsAndConditions}
                color="primary"
                onChange={toggleAcceptsTermsAndConditions}
                required
              />
            }
            label={
              <p>
                {'I accept the '}
                <StyledLink href={routes.termsAndConditions()} rel="noopener noreferrer" target="_blank">
                  {'Terms and Conditions'}
                </StyledLink>
                {', '}
                <StyledLink href={routes.privacyPolicy()} rel="noopener noreferrer" target="_blank">
                  {'Privacy Policy'}
                </StyledLink>
                {' and the '}
                <StyledLink href={routes.cookiePolicy()} rel="noopener noreferrer" target="_blank">
                  {'Cookie Policy'}
                </StyledLink>
                {'.'}
              </p>
            }
          />
          <AuthFormFooter>
            <Button color="primaryGradient" fullWidth type="submit" variant="contained">
              {'Signup'}
            </Button>
            <p>
              {'Already have an account? '}
              <Link to={routes.login()}>{'Login here'}</Link>
            </p>
          </AuthFormFooter>
        </AuthStyledForm>
      )}
    </AuthLayout>
  )
}

export default AffiliateSignup
