import React from 'react'
import { removeAuth } from 'utils'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const StyledDiv = styled.div`
  text-align: center;
`
const Account = ({ email, logout }) => (
  <StyledDiv>
    <h1>{'Your Account'}</h1>
    <p>{`You are logged in as ${email}`}</p>
    <button className="btn" onClick={logout} type="button">
      {'Log out'}
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
