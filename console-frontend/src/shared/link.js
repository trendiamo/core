import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link as RouteLink } from 'react-router-dom'
import { showUpToUsBranding } from 'utils'

const Container = styled(props => <span {...omit(props, ['isText'])} />)`
  a {
    outline: none;
    ${({ isText }) => (showUpToUsBranding() && isText ? 'color: #128976;' : 'text-decoration: none;')}
  }
`

const Link = ({ children, to, ...props }) => {
  const onClick = useCallback(event => {
    event.stopPropagation()
  }, [])

  return (
    <Container isText={typeof children === 'string'}>
      {to ? (
        <RouteLink to={to}>{children}</RouteLink>
      ) : (
        <a onClick={onClick} onKeyUp={onClick} role="link" tabIndex={0} {...props}>
          {children}
        </a>
      )}
    </Container>
  )
}

export default Link
