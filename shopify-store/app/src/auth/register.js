import { apiSignUp } from './utils'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'
import { LinkButton, StyledButton, StyledInput } from './auth-components'

const StyledDiv = styled.div`
  text-align: center;
  margint-top: 1rem;
`

const Register = ({ registerForm, registerSubmit, showLogin, setRegisterValue }) => (
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
      <label htmlFor="FirstName">{'Name'}</label>
      <StyledInput name="firstName" onChange={setRegisterValue} required type="text" value={registerForm.firstName} />
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
      <StyledInput name="password" onChange={setRegisterValue} required type="password" value={registerForm.password} />
      <StyledDiv>
        {/* <p><a>Forgot your password?</a></p> */}
        <StyledButton className="btn" type="submit" value="Sign Up" />
        <p>
          {'Already have an account? '}
          <LinkButton onClick={showLogin} type="button">
            {'Login'}
          </LinkButton>
        </p>
      </StyledDiv>
    </form>
  </React.Fragment>
)

export default compose(
  withState('registerForm', 'setRegisterForm', { email: '', firstName: '', lastName: '', password: '', username: '' }),
  withHandlers({
    registerSubmit: ({ closeAuthModal, registerForm }) => event => {
      event.preventDefault()
      apiSignUp({ user: registerForm })
      closeAuthModal()
    },
    setRegisterValue: ({ registerForm, setRegisterForm }) => event =>
      setRegisterForm({ ...registerForm, [event.target.name]: event.target.value }),
    showLogin: ({ setView }) => () => setView('login'),
  })
)(Register)
