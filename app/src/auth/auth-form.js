import React from 'react'
import styled from 'styled-components'
import { apiSignIn, apiSignUp } from './utils'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { isLoggedIn, removeAuth } from 'utils'

const StyledInput = styled.input`
  margin-bottom: 1rem;
  width: 100%;
`

const StyledButton = styled.input`
  margin-bottom: 1rem;
`

const StyledDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`

const LinkButton = styled.button`
  background: none !important;
  color: inherit;
  border: none;
  padding: 0 !important;
  font: inherit;
`

const AuthForm = ({
  email,
  isLoggedIn,
  loginForm,
  loginSubmit,
  logout,
  view,
  registerForm,
  registerSubmit,
  setLoginValue,
  setRegisterValue,
  showLogin,
  showRegister,
}) => (
  <div>
    {isLoggedIn ? (
      <div className="text-center">
        <h1>{'Your Account'}</h1>
        <p>{`You are logged in as ${email}`}</p>
        <button className="btn" onClick={logout} type="button">
          {'Logout'}
        </button>
      </div>
    ) : view === 'login' ? (
      <React.Fragment>
        <h1 className="text-center">{'Login'}</h1>
        <form acceptCharset="UTF-8" onSubmit={loginSubmit}>
          <label htmlFor="CustomerEmail">{'Email or Username'}</label>
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
          <label htmlFor="CustomerPassword">{'Password'}</label>
          <StyledInput name="password" onChange={setLoginValue} required type="password" value={loginForm.password} />
          <StyledDiv>
            {/* <p><a>Forgot your password?</a></p> */}
            <StyledButton className="btn" type="submit" value="Sign In" />
            <p>
              <LinkButton onClick={showRegister} type="button">
                {'Create account'}
              </LinkButton>
            </p>
          </StyledDiv>
        </form>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h1 className="text-center">{'Create Account'}</h1>
        <form acceptCharset="UTF-8" onSubmit={registerSubmit}>
          <label htmlFor="Username">{'Username'}</label>
          <StyledInput
            autofocus
            name="username"
            onChange={setRegisterValue}
            required
            type="text"
            value={registerForm.username}
          />
          <label htmlFor="FirstName">{'First Name'}</label>
          <StyledInput
            name="firstName"
            onChange={setRegisterValue}
            required
            type="text"
            value={registerForm.firstName}
          />
          <label htmlFor="LastName">{'Last Name'}</label>
          <StyledInput name="lastName" onChange={setRegisterValue} required type="text" value={registerForm.lastName} />
          <label htmlFor="Email">{'Email'}</label>
          <StyledInput
            autoCapitalize="off"
            autoCorrect="off"
            name="email"
            onChange={setRegisterValue}
            required
            type="email"
            value={registerForm.email}
          />
          <label htmlFor="CustomerPassword">{'Password'}</label>
          <StyledInput
            name="password"
            onChange={setRegisterValue}
            required
            type="password"
            value={registerForm.password}
          />
          <StyledDiv>
            {/* <p><a>Forgot your password?</a></p> */}
            <StyledButton className="btn" type="submit" value="Create" />
            <p>
              {'Already have an account? '}
              <LinkButton onClick={showLogin} type="button">
                {'login'}
              </LinkButton>
            </p>
          </StyledDiv>
        </form>
      </React.Fragment>
    )}
  </div>
)

export default compose(
  withState('view', 'setView', 'login'),
  withState('loginForm', 'setLoginForm', { email: '', password: '' }),
  withState('registerForm', 'setRegisterForm', { email: '', firstName: '', lastName: '', password: '', username: '' }),
  withProps(() => ({
    email: localStorage.getItem('authEmail'),
    isLoggedIn: isLoggedIn(),
  })),
  withHandlers({
    loginSubmit: ({ closeAuthModal, loginForm }) => event => {
      event.preventDefault()
      apiSignIn({ user: loginForm })
      closeAuthModal()
    },
    logout: ({ closeAuthModal }) => () => {
      removeAuth()
      closeAuthModal()
    },
    registerSubmit: ({ closeAuthModal, registerForm }) => event => {
      event.preventDefault()
      apiSignUp({ user: registerForm })
      closeAuthModal()
    },
    setLoginValue: ({ loginForm, setLoginForm }) => event =>
      setLoginForm({ ...loginForm, [event.target.name]: event.target.value }),
    setRegisterValue: ({ registerForm, setRegisterForm }) => event =>
      setRegisterForm({ ...registerForm, [event.target.name]: event.target.value }),
    showLogin: ({ setView }) => () => setView('login'),
    showRegister: ({ setView }) => () => setView('register'),
  })
)(AuthForm)
