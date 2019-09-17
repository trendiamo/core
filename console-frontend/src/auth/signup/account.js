import AuthLayout from 'auth/layout'
import Button from 'shared/button'
import DoneIcon from '@material-ui/icons/Done'
import HostnamesForm from 'shared/hostnames-form'
import Link from 'shared/link'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import { apiRequest, apiSignUp } from 'utils'
import { AuthFormFooter, AuthStyledForm } from 'auth/components'
import { Field } from 'shared/form-elements'
import { useSnackbar } from 'notistack'

const StyledDoneIcon = styled(DoneIcon)`
  color: #15c29d;
  width: 100%;
  height: 8rem;
`

const AccountSignup = () => {
  const passwordRef = useRef()

  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === 'mergeForm') {
        return { ...state, form: { ...state.form, ...action.value } }
      } else if (action.type === 'mergeFormCallback') {
        return { ...state, form: { ...state.form, ...action.callback(state.form) } }
      } else if (action.type === 'setFormSubmitted') {
        return { ...state, isFormSubmitted: action.value }
      } else {
        throw new Error()
      }
    },
    {
      form: {
        accountName: '',
        hostnames: [''],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      isFormSubmitted: false,
    }
  )

  const mergeForm = useCallback(value => dispatch({ type: 'mergeForm', value }), [dispatch])
  const mergeFormCallback = useCallback(callback => dispatch({ type: 'mergeFormCallback', callback }), [dispatch])
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

  const addHostnameSelect = useCallback(
    () => {
      mergeFormCallback(form => ({ hostnames: [...form.hostnames, ''] }))
    },
    [mergeFormCallback]
  )

  const deleteHostname = useCallback(
    index => {
      mergeFormCallback(form => {
        const newHostnames = [...form.hostnames]
        newHostnames.splice(index, 1)
        return { hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  const editHostnameValue = useCallback(
    (index, newValue) => {
      mergeFormCallback(form => {
        const newHostnames = [...form.hostnames]
        newHostnames[index] = newValue
        return { ...form, hostnames: newHostnames }
      })
    },
    [mergeFormCallback]
  )

  return (
    <AuthLayout title="Start selling with social!">
      {state.isFormSubmitted ? (
        <>
          <StyledDoneIcon />
          <div>{'Confirmation e-mail sent. Please confirm your account by following the link there.'}</div>
        </>
      ) : (
        <AuthStyledForm onSubmit={onSubmit}>
          <Field
            autoFocus
            label="Account name"
            name="accountName"
            onChange={setFieldValue}
            required
            value={state.form.accountName}
          />
          <HostnamesForm
            addHostnameSelect={addHostnameSelect}
            deleteHostname={deleteHostname}
            editHostnameValue={editHostnameValue}
            form={state.form}
            fullWidth
            margin="normal"
            required
          />
          <Field label="First Name" name="firstName" onChange={setFieldValue} required value={state.form.firstName} />
          <Field label="Last Name" name="lastName" onChange={setFieldValue} required value={state.form.lastName} />
          <Field label="E-mail" name="email" onChange={setFieldValue} required type="email" value={state.form.email} />
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

export default AccountSignup
