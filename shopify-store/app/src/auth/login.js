import { apiSignIn } from './utils'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { LinkButton, StyledButton, StyledInput } from './auth-components'

const StyledDiv = styled.div`
  text-align: center;
  margint-top: 1rem;
`

const Login = ({ loginForm, loginSubmit, showRegister, setLoginValue }) => (
  <React.Fragment>
    <h1 className="text-center">{'Login'}</h1>
    <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
      <label htmlFor="CustomerEmail">{'Email oder Nutzername'}</label>
      <StyledInput
        autoCapitalize="off"
        autoCorrect="off"
        autoFocus
        name="email"
        onChange={setLoginValue}
        required
        type="text"
        value={loginForm.email}
      />
      <label htmlFor="CustomerPassword">{'Passwort'}</label>
      <StyledInput name="password" onChange={setLoginValue} required type="password" value={loginForm.password} />
      <StyledDiv>
        {/* <p><a>Forgot your password?</a></p> */}
        <StyledButton className="btn" type="submit" value="Anmelden" />
        <p>
          <LinkButton onClick={showRegister} type="button">
            {'Account erstellen'}
          </LinkButton>
        </p>
      </StyledDiv>
    </form>
  </React.Fragment>
)

export default compose(
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withHandlers({
    loginSubmit: ({ closeAuthModal, loginForm }) => event => {
      event.preventDefault()
      apiSignIn({ user: loginForm })
      closeAuthModal()
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
    showRegister: ({ setView }) => () => setView('register'),
  })
)(Login)
