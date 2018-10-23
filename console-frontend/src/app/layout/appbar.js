import compose from 'recompose/compose'
import { connect } from 'react-redux'
import React from 'react'
import { toggleSidebar } from 'ra-core'
import withWidth from '@material-ui/core/withWidth'

//  RA includes its default AppBar if nothing was provided in <Layout />. So we override it by an empty div.
const AppBar = () => <div />

export default compose(
  connect(
    null,
    { toggleSidebar }
  ),
  withWidth()
)(AppBar)
