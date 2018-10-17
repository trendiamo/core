import CssBaseline from '@material-ui/core/CssBaseline'
import CustomAppBar from './appbar'
import CustomMenu from './menu'
import { Layout } from 'react-admin'
import React from 'react'

const CustomLayout = props => (
  <React.Fragment>
    <CssBaseline />
    <Layout {...props} appBar={CustomAppBar} menu={CustomMenu} title="customLayout" />
  </React.Fragment>
)

export default CustomLayout
