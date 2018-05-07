import React from 'react'
import { removeAuth } from 'utils'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const StyledDiv = styled.div`
  text-align: center;
`
const Account = ({ email, logout }) => (
  <StyledDiv>
    <h1>{'Dein Account'}</h1>
    <p>{`Du bist eingeloggt als ${email}`}</p>
    <button className="btn" onClick={logout} type="button">
      {'Ausloggen'}
    </button>
  </StyledDiv>
)

export default compose(
  withHandlers({
    logout: ({ closeAuthModal }) => () => {
      removeAuth()
      closeAuthModal()
    },
  })
)(Account)
