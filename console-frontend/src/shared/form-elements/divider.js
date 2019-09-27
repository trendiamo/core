import omit from 'lodash.omit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Divider as MuiDivider } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Divider = styled(props => <MuiDivider {...omit(props, ['folded'])} />)`
  border-bottom: 1px solid ${showUpToUsBranding() ? '#e7ecef' : '#ddd'};
  ${({ folded }) => folded && 'opacity: 0; visibility: hidden;'}
  transition: all 0.3s;
`

export default memo(Divider)
