import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'

const Logo = styled(props => <img alt="" {...omit(props, ['disabled'])} />)`
  display: inline-block;
  max-height: 40px;
  object-fit: cover;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  vertical-align: middle;
  width: 40px;
`

export default Logo
