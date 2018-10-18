import AppBar from './appbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import { Layout as RaLayout } from 'react-admin'
import React from 'react'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.logout
  return newProps
}

const Layout = props => (
  <React.Fragment>
    <CssBaseline />
    <RaLayout {...sanitizeProps(props)} appBar={AppBar} menu={Menu} title="" />
  </React.Fragment>
)

export default Layout
