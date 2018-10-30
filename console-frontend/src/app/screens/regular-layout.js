import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import styled from 'styled-components'
import { Main, StyledPaper } from './shared'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const AccountLayout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <StyledDiv>{children}</StyledDiv>
      </StyledPaper>
    </Main>
  </React.Fragment>
)

export default AccountLayout
