import { LinkButton } from './auth-components'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

export const StyledDiv = styled.div`
  text-align: center;
`

export const StyledButton = styled.button`
  margin-bottom: 1rem;
`

const RequireAuth = ({ closeAuthModal, showRegister }) => (
  <StyledDiv>
    <h1>{'Create Account'}</h1>
    <p>{'You need an Account for that'}</p>
    <div>
      <StyledButton className="btn" onClick={showRegister} type="button">
        {'Signup'}
      </StyledButton>
    </div>
    <LinkButton onClick={closeAuthModal} type="button">
      {'Close'}
    </LinkButton>
  </StyledDiv>
)

export default compose(
  withHandlers({
    showRegister: ({ setView }) => () => setView('register'),
  })
)(RequireAuth)
