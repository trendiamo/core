import { apiSignUp } from 'auth/utils'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const Register = ({
  errors,
  isConfirmationNeeded,
  onLoginSystemChange,
  registerForm,
  registerSubmit,
  setRegisterValue,
}) => (
  <section className="section section--account account account--register">
    <div className="container container--tiny">
      <div className="section__title section__title--center">
        <h1 className="section__title-text h2">{'Create Brand Account'}</h1>
      </div>
      {isConfirmationNeeded ? (
        <p>{'Please check your email and follow the confirmation link there to continue. Thank you!'}</p>
      ) : (
        <form acceptCharset="UTF-8" onSubmit={registerSubmit}>
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
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-1/2@tab">
              <label className="hidden-label" htmlFor="FirstName">
                {'First Name'}
              </label>
              <input
                autoCapitalize="words"
                id="FirstName"
                name="firstName"
                onChange={setRegisterValue}
                required
                type="text"
                value={registerForm.firstName}
              />
            </div>
            <div className="o-layout__item u-1/1 u-1/2@tab">
              <label htmlFor="LastName">{'Last Name'}</label>
              <input
                id="LastName"
                name="lastName"
                onChange={setRegisterValue}
                required
                type="text"
                value={registerForm.lastName}
              />
            </div>
          </div>
          <label htmlFor="Email">{'Email'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            id="Email"
            name="email"
            onChange={setRegisterValue}
            required
            type="email"
            value={registerForm.email}
          />
          <label htmlFor="CustomerPassword">{'Password'}</label>
          <input
            id="CustomerPassword"
            name="password"
            onChange={setRegisterValue}
            required
            type="password"
            value={registerForm.password}
          />
          <label>{'Would you like to signup to our awesome newsletter?'}</label>
          <div>
            <input
              id="CustomerFormNewsletter"
              name="subscribedToNewsletter"
              onChange={setRegisterValue}
              type="checkbox"
              value="1"
            />
            <label htmlFor="CustomerFormNewsletter" style={{ paddingLeft: '0.5rem', userSelect: 'none' }}>
              {'Yes, please!'}
            </label>
          </div>
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
  withState('registerForm', 'setRegisterForm', {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    subscribedToNewsletter: '0',
  }),
  withState('errors', 'setErrors', ''),
  withProps(({ errors }) => ({
    isConfirmationNeeded: errors === '<ul><li>signed up but unconfirmed</li></ul>',
  })),
  withHandlers({
    onLoginSystemChange: () => event => {
      if (event.target.value === 'customer') {
        location.reload()
      }
    },
    registerSubmit: ({ auth, registerForm, setErrors }) => event => {
      event.preventDefault()
      apiSignUp({ user: registerForm }, auth, setErrors)
    },
    setRegisterValue: ({ registerForm, setRegisterForm }) => event => {
      const value =
        event.target.name === 'subscribedToNewsletter' ? (event.target.checked ? '1' : '0') : event.target.value
      return setRegisterForm({ ...registerForm, [event.target.name]: value })
    },
  })
)(Register)
