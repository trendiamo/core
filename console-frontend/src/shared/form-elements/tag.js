import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Chip } from '@material-ui/core'

const Tag = styled(props => <Chip {...omit(props, ['disabled'])} />)`
  margin: 2px;
  text-transform: uppercase;
  border-radius: 4px;
  height: 24px;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
  color: #fff;
  transition: all 0.3s;
  span {
    padding: 0 6px;
    font-weight: 700;
  }
`

export default Tag
