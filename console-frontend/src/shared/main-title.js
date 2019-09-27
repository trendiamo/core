import React from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'
import { Typography } from '@material-ui/core'

const StyledTypography = styled(Typography)`
  color: ${showUpToUsBranding() ? '#272932' : '#333'};
  display: inline-block;
  font-weight: ${showUpToUsBranding() ? 900 : 500};
  letter-spacing: 0.3px;
  font-size: ${showUpToUsBranding() ? 20 : 24}px;

  @media (max-width: 960px) {
    font-size: 16px;
  }
`

const MainTitle = ({ titleRef, ...props }) => <StyledTypography ref={titleRef} variant="h4" {...props} />

export default MainTitle
