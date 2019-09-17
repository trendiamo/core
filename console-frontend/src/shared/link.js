import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Link as RouteLink } from 'react-router-dom'
import { showUpToUsBranding } from 'utils'

const StyledRouteLink = styled(props => <RouteLink {...omit(props, ['isText'])} />)`
  ${({ isText }) => (showUpToUsBranding() && isText ? 'color: #128976;' : 'text-decoration: none;')}
`

const Link = ({ to = '/', children }) => (
  <StyledRouteLink isText={typeof children === 'string'} to={to}>
    {children}
  </StyledRouteLink>
)

export default Link
