import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Paper } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const StyledPaper = styled(props => <Paper {...omit(props, ['foldable'])} />)`
  align-items: center;
  display: flex;
  flex-direction: column;
  & + * {
    margin-top: ${showUpToUsBranding() ? '18px' : '10px'};
  }
  ${({ foldable }) => foldable && 'padding-top: 16px;'}
  ${showUpToUsBranding() &&
    'border-radius: 0; box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.07);'}
`

export default StyledPaper
