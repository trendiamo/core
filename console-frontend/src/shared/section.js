import React, { memo } from 'react'
import styled from 'styled-components'
import { Divider, FlexBar, Header } from 'shared/form-elements'
import { Paper } from '@material-ui/core'

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
`

const StyledPaper = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
  & + * {
    margin-top: 10px;
  }
`

const Section = ({ actions, className, children, title }) => (
  <StyledPaper className={className}>
    <StyledDiv>
      {title && (
        <>
          <FlexBar>
            <Header variant="subtitle1">{title}</Header>
            {actions}
          </FlexBar>
          <Divider style={{ marginBottom: '1rem' }} />
        </>
      )}
      {children}
    </StyledDiv>
  </StyledPaper>
)

export default memo(Section)
