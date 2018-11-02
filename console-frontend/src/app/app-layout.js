import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import styled from 'styled-components'

const Main = styled.main`
  display: block;
`

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const StyledPaper = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
`

const AppLayout = ({ children }) => (
  <React.Fragment>
    <CssBaseline />
    <Main>
      <StyledPaper>
        <StyledDiv>{children}</StyledDiv>
      </StyledPaper>
    </Main>
  </React.Fragment>
)

export default AppLayout
