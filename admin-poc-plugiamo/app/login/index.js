import { apiSignIn } from '../auth/utils'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const Login = ({ loginForm, loginSubmit, setLoginValue }) => (
  <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
    <Input
      autoFocus
      name="email"
      onChange={setLoginValue}
      required
      type="text"
      value={loginForm.email}
    />
    <Input name="password" onChange={setLoginValue} required type="password" value={loginForm.password} />
    <Input type="submit" value="Login" />
  </form>
)

export default compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('errors', 'setErrors', null),
  withHandlers({
    loginSubmit: ({ loginForm, setErrors }) => async event => {
      event.preventDefault()
      await apiSignIn({ user: { email: loginForm.email, password: loginForm.password } })
      localStorage.authToken && localStorage.authEmail ? (location.href = '/') : setErrors('there has been an error')
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(Login)
