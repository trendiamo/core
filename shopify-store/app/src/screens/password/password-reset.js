import { apiPasswordReset } from 'auth/utils'
import querystring from 'querystring'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const PasswordReset = ({ passwordResetSubmit, passwordForm, setFieldValue, errors }) => (
  <section className="section section--account account account--login">
    <div className="container container--tiny">
      <div className="section__title section__title--center section__title--desc">
        <h1 className="section__title-text h2">{'Reset account password'}</h1>
        <p className="section__title-desc">{'Enter a new password'}</p>
      </div>
      <div className="account__form" />
      <form acceptCharset="UTF-8" onSubmit={passwordResetSubmit}>
        {errors && <div className="errors" dangerouslySetInnerHTML={{ __html: errors }} />}
        <label htmlFor="CustomerPassword">{'Password'}</label>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          name="fieldOne"
          onChange={setFieldValue}
          required
          type="password"
          value={passwordForm.fieldOne}
        />
        <label htmlFor="CustomerPassword">{'Confirm Password'}</label>
        <input
          autoCapitalize="off"
          autoCorrect="off"
          name="fieldTwo"
          onChange={setFieldValue}
          required
          type="password"
          value={passwordForm.fieldTwo}
        />
        <div className="account__form-buttons">
          <input className="c-btn c-btn--primary account__form-submit" type="submit" value="Reset password" />
        </div>
      </form>
    </div>
  </section>
)

export default compose(
  withState('passwordForm', 'setPasswordForm', {
    fieldOne: '',
    fieldTwo: '',
  }),
  withState('errors', 'setErrors', ''),
  withHandlers({
    passwordResetSubmit: ({ passwordForm, setErrors, auth }) => event => {
      event.preventDefault()
      if (passwordForm.fieldOne === passwordForm.fieldTwo) {
        apiPasswordReset(
          {
            user: {
              password: passwordForm.fieldTwo,
              reset_password_token: querystring.parse(location.search.substring(1))['reset_password_token'],
            },
          },
          auth,
          setErrors
        )
      } else {
        setErrors("<ul><li>Passwords don't match</li></ul>")
      }
    },
    setFieldValue: ({ setPasswordForm, passwordForm }) => event => {
      event.preventDefault()
      const value = event.target.value
      setPasswordForm({ ...passwordForm, [event.target.name]: value })
    },
  })
)(PasswordReset)
