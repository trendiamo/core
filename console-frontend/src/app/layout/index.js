import CssBaseline from '@material-ui/core/CssBaseline'
import CustomAppBar from './appbar'
import { Layout } from 'react-admin'
import React from 'react'

const CustomLayout = props => (
  <React.Fragment>
    <CssBaseline />
    <Layout {...props} appBar={CustomAppBar} title="customLayout" />
  </React.Fragment>
)

export default CustomLayout
