import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const StyledTypography = styled(Typography)`
  color: #333;
  display: inline-block;
  font-weight: 500;
  letter-spacing: 0.3px;
  font-size: 24px;
  margin-right: 2px;

  @media (max-width: 960px) {
    font-size: 16px;
  }
`

const MainTitle = ({ titleRef, ...props }) => <StyledTypography ref={titleRef} variant="h6" {...props} />

export default MainTitle
