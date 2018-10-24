// import compose from 'recompose/compose'
import React from 'react'
import { Sidebar } from 'react-admin'
import theme from '../theme'

const SidebarStyle = {
  background: theme.palette.primary.main,
  flex: '1',
  marginRight: '10px',
  minHeight: '100vh',
}

const SidebarParentStyle = {
  display: 'flex',
}

const MySidebar = ({ ...props }) => (
  <div style={SidebarParentStyle}>
    <Sidebar {...props} style={SidebarStyle} />
  </div>
)

export default MySidebar
