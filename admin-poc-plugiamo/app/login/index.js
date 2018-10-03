import { apiSignIn } from '../auth/utils'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const Login = ({ loginForm, loginSubmit, setLoginValue }) => (
  <div id="root">
    <div>
      <h1>{'Login'}</h1>
      <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          name="email"
          onChange={setLoginValue}
          required
          type="text"
          value={loginForm.email}
        />
        <input name="password" onChange={setLoginValue} required type="password" value={loginForm.password} />
        <input type="submit" value="Login" />
      </form>
    </div>
  </div>
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
