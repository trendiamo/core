import React from 'react'
import { Link as RouteLink } from 'react-router-dom'

const Link = ({ to = '/', children }) => {
  return (
    <RouteLink style={{ textDecoration: 'none' }} to={to}>
      {children}
    </RouteLink>
  )
}

export default Link
