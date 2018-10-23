import AppBar from './appbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import React from 'react'
import { Layout as RaLayout, Sidebar } from 'react-admin'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.logout
  return newProps
}

const SidebarStyle = {
  background: '#32333d',
  height: '100vh',
  marginRight: '10px',
}

const MySidebar = ({ ...props }) => <Sidebar {...props} style={SidebarStyle} />

const Layout = props => (
  <React.Fragment>
    <CssBaseline />
    <RaLayout {...sanitizeProps(props)} appBar={AppBar} menu={Menu} sidebar={MySidebar} title="" />
  </React.Fragment>
)

export default Layout
