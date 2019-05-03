import omit from 'lodash.omit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Divider as MuiDivider } from '@material-ui/core'

const Divider = styled(props => <MuiDivider {...omit(props, ['folded'])} />)`
  height: ${({ folded }) => (folded ? '0' : '1px')};
  background: ${({ color }) => color || 'none'};
  border-bottom: 1px solid #ddd;
  margin: 0 -24px 0;
  opacity: ${({ folded }) => (folded ? 0 : 1)};
  transition: all 0.5s;
`

export default memo(
  Divider,
  (prevProps, nextProps) => prevProps.folded === nextProps.folded && prevProps.color === nextProps.color
)
