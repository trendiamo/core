import React from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'
import { Typography } from '@material-ui/core'

const StyledTypography = styled(Typography)`
  display: inline-block;
  letter-spacing: 0.3px;
  ${showUpToUsBranding()
    ? `
      color: #272932;
      font-weight: 900;
      font-size: 18px;
    `
    : `
      color: #333;
      font-weight: 500;
      font-size: 16px;
    `}
  margin-left: 8px;

  @media (min-width: 960px) {
    font-size: ${showUpToUsBranding() ? 20 : 24}px;
    margin-left: 0px;
  }
`

const MainTitle = ({ titleRef, ...props }) => <StyledTypography ref={titleRef} variant="h3" {...props} />

export default MainTitle
