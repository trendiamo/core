import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Link as RouteLink } from 'react-router-dom'
import { showUpToUsBranding } from 'utils'

const Container = styled(props => <span {...omit(props, ['isText'])} />)`
  a {
    ${({ isText }) => (showUpToUsBranding() && isText ? 'color: #128976;' : 'text-decoration: none;')}
  }
`

const Link = ({ children, to, ...props }) => (
  <Container isText={typeof children === 'string'}>
    {to ? <RouteLink to={to}>{children}</RouteLink> : <a {...props}>{children}</a>}
  </Container>
)

export default Link
