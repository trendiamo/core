import Paper from '@material-ui/core/Paper'
import React from 'react'
import styled from 'styled-components'

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

const PaperContainer = ({ children }) => (
  <React.Fragment>
    <StyledPaper>
      <StyledDiv>{children}</StyledDiv>
    </StyledPaper>
  </React.Fragment>
)

export default PaperContainer
