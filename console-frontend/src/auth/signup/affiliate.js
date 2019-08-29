import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import DoneIcon from '@material-ui/icons/Done'
import Link from 'shared/link'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiRequest, apiSignUp } from 'utils'
import { AuthFormFooter, AuthStyledForm } from 'auth/components'
import { FormControl, Input, InputLabel } from '@material-ui/core'
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
      },
      isFormSubmitted: false,
    }
  )

  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const setFormSubmitted = useCallback(value => dispatch({ type: 'setFormSubmitted', value }), [dispatch])

  const setFieldValue = useCallback(event => mergeForm({ [event.target.name]: event.target.value }), [mergeForm])

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

      const { errors, requestError } = await apiRequest(apiSignUp, [{ user: state.form }])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) {
        setFormSubmitted(true)
      }
    },
    [enqueueSnackbar, setFormSubmitted, state.form]
  )

  return (
    <AuthLayout title="Start monetizing with positive influence">
      {state.isFormSubmitted ? (
        <>
          <StyledDoneIcon />
          <div>{'Confirmation e-mail sent. Please confirm your account by following the link there.'}</div>
        </>
      ) : (
        <AuthStyledForm onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="firstName">{'First Name'}</InputLabel>
            <Input id="firstName" name="firstName" onChange={setFieldValue} required value={state.form.firstName} />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="lastName">{'Last Name'}</InputLabel>
            <Input id="lastName" name="lastName" onChange={setFieldValue} required value={state.form.lastName} />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="socialMediaUrl">{'Primary Social Media URL'}</InputLabel>
            <Input
              id="socialMediaUrl"
              inputProps={socialMediaUrlInputProps}
              name="socialMediaUrl"
              onChange={setFieldValue}
              required
              type="url"
              value={state.form.socialMediaUrl}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="referredByCode">{'Referral Code'}</InputLabel>
            <Input
              id="referredByCode"
              name="referredByCode"
              onChange={setFieldValue}
              value={state.form.referredByCode}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="email">{'E-mail'}</InputLabel>
            <Input
              autoComplete="email"
              id="email"
              name="email"
              onChange={setFieldValue}
              required
              type="email"
              value={state.form.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="password">{'Password'}</InputLabel>
            <Input
              id="password"
              inputRef={passwordRef}
              name="password"
              onChange={setFieldValue}
              required
              type="password"
              value={state.form.password}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel htmlFor="passwordConfirmation">{'Confirm Password'}</InputLabel>
            <Input
              id="passwordConfirmation"
              name="passwordConfirmation"
              onChange={setFieldValue}
              required
              type="password"
              value={state.form.passwordConfirmation}
            />
          </FormControl>
          <AuthFormFooter>
            <Button color="primaryGradient" fullWidth type="submit" variant="contained">
              {'Signup'}
            </Button>
            <p>
              {'Already have an account? '}
              <Link to={routes.login()}>{'Login'}</Link>
            </p>
          </AuthFormFooter>
        </AuthStyledForm>
      )}
    </AuthLayout>
  )
}

export default AffiliateSignup