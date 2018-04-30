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
    <h1>{'Account erstellen'}</h1>
    <p>{'Du brauchst einen Account oder musst dich einloggen.'}</p>
    <div>
      <StyledButton className="btn" onClick={showRegister} type="button">
        {'Registrieren'}
      </StyledButton>
    </div>
    <LinkButton onClick={closeAuthModal} type="button">
      {'Schließen'}
    </LinkButton>
  </StyledDiv>
)

export default compose(
  withHandlers({
    showRegister: ({ setView }) => () => setView('register'),
  })
)(RequireAuth)
