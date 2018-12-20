import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import React from 'react'
import withWidth from '@material-ui/core/withWidth'
import { compose, lifecycle, withState } from 'recompose'

const Sidebar = ({ children, classes, sidebarOpen, toggleOpen, menuLoaded }) => (
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
        {React.cloneElement(children, { menuLoaded })}
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
        {React.cloneElement(children, { menuLoaded })}
      </Drawer>
    </Hidden>
  </React.Fragment>
)

export default compose(
  withState('menuLoaded', 'setMenuLoaded', false),
  lifecycle({
    componentDidMount() {
      setTimeout(() => {
        const { setMenuLoaded } = this.props
        setMenuLoaded(true)
      }, 2000)
    },
  }),
  withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar)
