import { apiSignIn } from 'auth/utils'
import { FlashMessage } from 'shared/flash-message'
import { navTo } from 'app/utils'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const Login = ({
  errors,
  loginForm,
  loginSubmit,
  onLoginSystemChange,
  setLoginValue,
  showMessage,
  onForgotPassword,
}) => (
  <section className="section section--account account account--login">
    <div className="container container--tiny">
      <div className="section__title section__title--center">
        <h1 className="section__title-text h2">{'Brand Login'}</h1>
      </div>
      {showMessage && (
        <FlashMessage success={showMessage === 'confirmed'} warning={showMessage === 'error'}>
          {showMessage === 'confirmed'
            ? 'Your account has been confirmed, you can now login.'
            : 'Confirmation link already used or expired, please try to login.'}
        </FlashMessage>
      )}
      <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
        {errors && <div className="errors" dangerouslySetInnerHTML={{ __html: errors }} />}
        <div className="selector-wrapper">
          <select
            defaultValue="brand"
            id="login-system-select"
            onChange={onLoginSystemChange}
            style={{ paddingLeft: '20px' }}
          >
            <option value="customer">{"I'm a customer"}</option>
            <option value="brand">{"I'm a brand"}</option>
          </select>
        </div>
        <label htmlFor="CustomerEmail">{'Email'}</label>
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
        <p className="account__reset-link">
          <a href="/u/password" onClick={onForgotPassword}>
            {'Forgot Password?'}
          </a>
        </p>
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
  withProps({
    showMessage: location.hash.replace('#', ''),
  }),
  withHandlers({
    loginSubmit: ({ auth, loginForm, setErrors }) => async event => {
      event.preventDefault()
      apiSignIn({ user: loginForm }, auth, setErrors)
    },
    onForgotPassword: () => event => {
      event.preventDefault()
      navTo(event.target.href)
    },
    onLoginSystemChange: () => event => {
      if (event.target.value === 'customer') {
        location.reload()
      }
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
  })
)(Login)
