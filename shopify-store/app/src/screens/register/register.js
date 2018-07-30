import { apiSignUp } from 'auth/utils'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const Register = ({ errors, isConfirmationNeeded, registerForm, registerSubmit, setRegisterValue }) => (
  <section className="section section--account account account--register">
    <div className="container container--tiny">
      <div className="section__title section__title--center">
        <h1 className="section__title-text h2">{'Create Account'}</h1>
      </div>
      {isConfirmationNeeded ? (
        <p>{'Please check your email and follow the confirmation link there to continue. Thank you!'}</p>
      ) : (
        <form acceptCharset="UTF-8" onSubmit={registerSubmit}>
          {errors && <div className="errors" dangerouslySetInnerHTML={{ __html: errors }} />}
          <label htmlFor="Username">{'Username'}</label>
          <input
            autoFocus
            name="username"
            onChange={setRegisterValue}
            required
            type="text"
            value={registerForm.username}
          />
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-1/2@tab">
              <label className="hidden-label" htmlFor="FirstName">
                {'First Name'}
              </label>
              <input
                autoCapitalize="words"
                name="firstName"
                onChange={setRegisterValue}
                required
                type="text"
                value={registerForm.firstName}
              />
            </div>
            <div className="o-layout__item u-1/1 u-1/2@tab">
              <label htmlFor="LastName">{'Last Name'}</label>
              <input name="lastName" onChange={setRegisterValue} required type="text" value={registerForm.lastName} />
            </div>
          </div>
          <label htmlFor="Email">{'Email'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            name="email"
            onChange={setRegisterValue}
            required
            type="email"
            value={registerForm.email}
          />
          <label htmlFor="CustomerPassword">{'Password'}</label>
          <input name="password" onChange={setRegisterValue} required type="password" value={registerForm.password} />
          {/* <p><a>Forgot your password?</a></p> */}
          <div className="account__form-buttons">
            <input className="c-btn c-btn--primary account__form-submit" type="submit" value="Create" />
            <a className="link account__form-secondary-btn" href="/">
              {'Return to store'}
            </a>
          </div>
        </form>
      )}
    </div>
  </section>
)

export default compose(
  withState('registerForm', 'setRegisterForm', { email: '', firstName: '', lastName: '', password: '', username: '' }),
  withState('errors', 'setErrors', ''),
  withProps(({ errors }) => ({
    isConfirmationNeeded: errors === '<ul><li>signed up but unconfirmed</li></ul>',
  })),
  withHandlers({
    registerSubmit: ({ auth, registerForm, setErrors }) => event => {
      event.preventDefault()
      apiSignUp({ user: registerForm }, auth, setErrors)
    },
    setRegisterValue: ({ registerForm, setRegisterForm }) => event =>
      setRegisterForm({ ...registerForm, [event.target.name]: event.target.value }),
  })
)(Register)
