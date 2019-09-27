import omit from 'lodash.omit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

// The width is specified because without it, the ellipsis wouldn't work in the chats and showcases
const Header = styled(props => <Typography {...omit(props, ['ellipsize'])} />)`
  width: 200px;
  ${({ ellipsize }) =>
    ellipsize &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  flex: 1;
  & + * {
    margin-left: 10px;
  }
  margin: 0;
`

export default memo(Header)
