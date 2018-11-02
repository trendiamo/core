import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const AppBar = ({ classes, open, toggleOpen }) => (
  <MuiAppBar className={classNames(classes.appBar, open && classes.appBarShift)} position="absolute">
    <Toolbar>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={toggleOpen}>
        <MenuIcon />
      </IconButton>
      <Typography className={classes.title} color="default" id="react-admin-title" variant="title" />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
