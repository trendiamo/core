import { apiPassword } from 'auth/utils'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const Password = ({ errors, passwordForm, setEmailValue, passwordChangeSubmit, submitted }) => (
  <section className="section section--account account account--login">
    <div className="container container--tiny">
      <div className="section__title section__title--center">
        <h1 className="section__title-text h2">{'Reset your password'}</h1>
      </div>
      {submitted ? (
        // load login page here
        <div className="account__note success" id="ResetSuccess">
          <p>
            {
              'If you entered a correct email address, you will have recieved an email with a link to update your password.'
            }
          </p>
          <a className="link account__form-secondary-btn" href="/account/login">
            {'Back to Login'}
          </a>
        </div>
      ) : (
        <form acceptCharset="UTF-8" onSubmit={passwordChangeSubmit}>
          {errors && <div className="errors" dangerouslySetInnerHTML={{ __html: errors }} />}
          <label htmlFor="CustomerEmail">{'Email'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            autoFocus
            name="email"
            onChange={setEmailValue}
            required
            type="email"
            value={passwordForm.email}
          />
          <p>{'We will send you an email to reset your password.'}</p>
          <div className="account__form-buttons">
            <input className="c-btn c-btn--primary account__form-submit" type="submit" value="Submit" />
            <a className="link account__form-secondary-btn" href="/account/login">
              {'Cancel'}
            </a>
          </div>
        </form>
      )}
    </div>
  </section>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', {
    email: '',
  }),
  withState('submitted', 'setSubmitted', false),
  withHandlers({
    passwordChangeSubmit: ({ passwordForm, setErrors, setSubmitted, submitted, errors }) => event => {
      event.preventDefault()
      errors ? submitted : setSubmitted(true)
      apiPassword({ user: { email: passwordForm.email } }, setErrors)
    },
    setEmailValue: ({ passwordForm, setPasswordForm }) => event => {
      const value = event.target.value
      return setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(Password)
