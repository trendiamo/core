import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import React from 'react'
import withWidth from '@material-ui/core/withWidth'
import { compose } from 'recompose'

const Sidebar = ({ children, classes, sidebarOpen, toggleOpen }) => (
  <React.Fragment>
    <Hidden implementation="js" mdUp>
      <div className={classNames(classes.drawerGhost)} />
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={toggleOpen}
        open={sidebarOpen}
        variant="temporary"
      >
        {children}
      </Drawer>
    </Hidden>
    <Hidden implementation="js" smDown>
      <div className={classNames(classes.drawerGhost, !sidebarOpen && classes.drawerGhostClosed)} />
      <Drawer
        classes={{
          paper: sidebarOpen ? classes.drawerPaper : classes.drawerPaperClose,
        }}
        open={sidebarOpen}
        variant="permanent"
      >
        {children}
      </Drawer>
    </Hidden>
  </React.Fragment>
)

export default compose(
  withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar)
