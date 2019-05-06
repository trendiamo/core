import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Drawer, Hidden, withWidth } from '@material-ui/core'

const Sidebar = ({ children, classes, sidebarOpen, toggleOpen }) => {
  const [menuLoaded, setMenuLoaded] = useState(false)

  useEffect(() => {
    let didCancel = false
    setTimeout(() => {
      didCancel || setMenuLoaded(true)
    }, 2000)
    return () => (didCancel = true)
  }, [])

  return (
    <>
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
    </>
  )
}

// withWidth used to initialize the visibility on first render
export default withWidth({ resizeInterval: Infinity, noSSR: true })(Sidebar)
