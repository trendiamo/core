import classNames from 'classnames'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const AppBar = ({ classes, open, handleOpen }) => (
  <MuiAppBar className={classNames(classes.appBar, open && classes.appBarShift)} position="absolute">
    <Toolbar>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      <Typography className={classes.title} color="default" id="react-admin-title" variant="title" />
    </Toolbar>
  </MuiAppBar>
)

const DoubleBar = ({ open, toggleMobileOpen, toggleOpen, ...props }) => (
  <React.Fragment>
    <Hidden implementation="js" mdUp>
      <AppBar handleOpen={toggleMobileOpen} open={open} {...props} />
    </Hidden>
    <Hidden implementation="js" smDown>
      <AppBar handleOpen={toggleOpen} open={open} {...props} />
    </Hidden>
  </React.Fragment>
)

export default DoubleBar
