import auth from 'auth'
import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import routes from 'app/routes'
import { apiRequest, apiSignUpWithInvite } from 'utils'
import { Field } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const parseSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search.replace('?', ''))
  const email = decodeURIComponent(searchParams.get('email'))
  const token = searchParams.get('token')
  return { email, token }
}

const SignupConfirm = () => {
  const passwordRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'mergeFormCallback') {
        return { ...state, form: { ...state.form, ...action.callback(state.form) } }
      } else {
        throw new Error()
      }
    },
    {
      form: {
        email: parseSearchParams().email || '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
      },
    }
  )

  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])

  const setFieldValue = useCallback(event => mergeForm({ [event.target.name]: event.target.value }), [mergeForm])

  useEffect(() => {
    if (!passwordRef.current) return
    if (state.form.password !== state.form.passwordConfirmation) {
      passwordRef.current.setCustomValidity('Passwords do not match')
    } else {
      passwordRef.current.setCustomValidity('')
    }
  }, [passwordRef, setFieldValue, state.form.password, state.form.passwordConfirmation])

  const onSubmit = useCallback(
    async event => {
      event.preventDefault()

      const { json, errors, requestError } = await apiRequest(apiSignUpWithInvite, [
        { user: state.form, token: parseSearchParams().token },
      ])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!requestError && !errors) auth.setUser(json.user)
      if (auth.isLoggedIn()) {
        window.location.href = routes.root()
      }
    },
    [enqueueSnackbar, state.form]
  )

  return (
    <AuthLayout title="Start selling with social!">
      <form onSubmit={onSubmit}>
        <Field
          autoComplete="email"
          label="E-mail"
          name="email"
          onChange={setFieldValue}
          required
          type="email"
          value={state.form.email}
        />
        <Field label="First Name" name="firstName" onChange={setFieldValue} required value={state.form.firstName} />
        <Field label="Last Name" name="lastName" onChange={setFieldValue} required value={state.form.lastName} />
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
        <div style={{ marginTop: '2rem', width: '70%' }}>
          <Button color="primaryGradient" fullWidth type="submit" variant="contained">
            {'Signup'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  )
}

export default SignupConfirm
