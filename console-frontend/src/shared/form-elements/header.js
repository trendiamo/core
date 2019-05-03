import omit from 'lodash.omit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

// The width is specified because without it, the ellipsis wouldn't work in the chats and showcases
const Header = styled(props => <Typography {...omit(props, ['ellipsize'])} />)`
  width: 200px;
  white-space: ${({ ellipsize }) => (ellipsize ? 'nowrap' : 'normal')};
  overflow: ${({ ellipsize }) => (ellipsize ? 'hidden' : 'none')};
  text-overflow: ${({ ellipsize }) => (ellipsize ? 'ellipsis' : 'none')};
  flex: 1;
  & + * {
    margin-left: 10px;
  }
`

export default memo(
  Header,
  (prevProps, nextProps) => prevProps.ellipsize === nextProps.ellipsize && prevProps.children === nextProps.children
)
