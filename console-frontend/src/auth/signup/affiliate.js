import AuthFormFooter from 'auth/form-footer'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import DoneIcon from '@material-ui/icons/Done'
import GoogleAuthButton from 'shared/google/auth-button'
import Link from 'shared/link'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiRequest, apiSignUp } from 'utils'
import { Divider, Field, Fieldset } from 'shared/form-elements'
import { parse } from 'query-string'
import { useSnackbar } from 'notistack'

const StyledDoneIcon = styled(DoneIcon)`
  color: #15c29d;
  width: 100%;
  height: 8rem;
`

const StyledDivider = styled(Divider)`
  margin: 30px 0 12px;
`

const AffiliateSignup = () => {
  const passwordRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'setFormSubmitting') {
        return { ...state, isFormSubmitting: action.value }
      } else if (action.type === 'setFormSubmitted') {
        return { ...state, isFormSubmitted: action.value, isFormSubmitting: false }
      } else {
        throw new Error()
      }
    },
    {
      form: {
        affiliateRole: 'promoter',
        firstName: '',
        lastName: '',
        referredByCode: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      isFormSubmitting: false,
      isFormSubmitted: false,
    }
  )

  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const setFormSubmitting = useCallback(value => dispatch({ type: 'setFormSubmitting', value }), [dispatch])
  const setFormSubmitted = useCallback(value => dispatch({ type: 'setFormSubmitted', value }), [dispatch])

  const setFieldValue = useCallback(event => mergeForm({ [event.target.name]: event.target.value }), [mergeForm])

  useEffect(() => {
    const { aftk } = parse(window.location.search)
    if (aftk) window.localStorage.setItem('signup-aftk', aftk)
  }, [])

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

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()
      setFormSubmitting(true)
      const { errors, requestError } = await apiRequest(apiSignUp, [{ user: state.form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        mixpanel.track('Signed Up', { hostname: window.location.hostname })
        setFormSubmitted(true)
      } else {
        setFormSubmitting(false)
      }
    },
    [enqueueSnackbar, setFormSubmitted, setFormSubmitting, state.form]
  )

  return (
    <AuthLayout>
      {state.isFormSubmitted ? (
        <>
          <StyledDoneIcon />
          <div>{'Confirmation e-mail sent. Please confirm your account by following the link there.'}</div>
        </>
      ) : (
        <>
          <GoogleAuthButton text="Sign up with Google" />
          <StyledDivider color="dark" text="or" />
          <form onSubmit={onSubmit}>
            <Fieldset disabled={state.isFormSubmitting}>
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
              <AuthFormFooter>
                <Button
                  color="primaryGradient"
                  disabled={state.isFormSubmitting}
                  isFormSubmitting={state.isFormSubmitting}
                  type="submit"
                  variant="contained"
                >
                  {'Next'}
                </Button>
                <p>
                  {'Already have an account? '}
                  <Link to={routes.login()}>{'Login here'}</Link>
                </p>
              </AuthFormFooter>
            </Fieldset>
          </form>
        </>
      )}
    </AuthLayout>
  )
}

export default AffiliateSignup
