import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import React from 'react'
import withWidth from '@material-ui/core/withWidth'
import { compose } from 'recompose'
import { connect } from 'react-redux'

const Sidebar = ({ children, classes, open, toggleOpen }) => (
  <React.Fragment>
    <Hidden implementation="js" mdUp>
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        onClose={toggleOpen}
        open={open}
        variant="temporary"
      >
        {children}
      </Drawer>
    </Hidden>
    <Hidden implementation="js" smDown>
      <Drawer
        classes={{
          paper: open ? classes.drawerPaper : classes.drawerPaperClose,
        }}
        open={open}
        variant="permanent"
      >
        {children}
      </Drawer>
    </Hidden>
  </React.Fragment>
)

const mapStateToProps = state => ({
  locale: state.locale, // force redraw on locale change
})

export default compose(
  connect(
    mapStateToProps,
    {}
  ),
  withWidth({ resizeInterval: Infinity }) // used to initialize the visibility on first render
)(Sidebar)
