// import compose from 'recompose/compose'
import { Sidebar as RaSidebar } from 'react-admin'
import React from 'react'
import { drawerWidth, drawerWidthClosed } from './layout-styles'

const Sidebar = ({ classes, ...props }) => (
  <RaSidebar
    classes={{ drawerPaper: classes.drawerPaper }}
    closedSize={drawerWidthClosed}
    size={drawerWidth}
    style={{ display: 'flex' }}
    {...props}
  />
)

export default Sidebar
