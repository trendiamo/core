import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'

const WhiteButton = styled(props => <Button {...omit(props, ['inline'])} />)`
  ${({ inline }) => (inline ? '& + *{margin-left: 10px;} ' : '')}
  background: #fff;
  &:hover {
    background: #f3f3f3;
  }
`

export default WhiteButton
