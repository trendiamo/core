import { apiSignIn } from 'auth/utils'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const Login = ({ errors, loginForm, loginSubmit, setLoginValue }) => (
  <section className="section section--account account account--login">
    <div className="container container--tiny">
      <div className="section__title section__title--center">
        <h1 className="section__title-text h2">{'Login'}</h1>
      </div>
      <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
        {errors && <div className="errors" dangerouslySetInnerHTML={{ __html: errors }} />}
        <label htmlFor="CustomerEmail">{'Email or Username'}</label>
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
        <label htmlFor="CustomerPassword">{'Password'}</label>
        <input name="password" onChange={setLoginValue} required type="password" value={loginForm.password} />
        {/* <p className="account__reset-link"><a>Forgot your password?</a></p> */}
        <div className="account__form-buttons">
          <input className="c-btn c-btn--primary account__form-submit" type="submit" value="Sign In" />
          <a className="link account__form-secondary-btn" href="/account/register">
            {'Create Account'}
          </a>
        </div>
      </form>
    </div>
  </section>
)

export default compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('errors', 'setErrors', ''),
  withHandlers({
    loginSubmit: ({ auth, loginForm, setErrors }) => async event => {
      event.preventDefault()
      apiSignIn({ user: loginForm }, auth, setErrors)
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(Login)
