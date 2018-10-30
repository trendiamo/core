import classNames from 'classnames'
import MuiAppBar from '@material-ui/core/AppBar'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const AppBar = ({ classes, open }) => (
  <MuiAppBar className={classNames(classes.appBar, open && classes.appBarShift)} position="absolute">
    <Toolbar>
      <Typography className={classes.title} color="default" id="react-admin-title" variant="title" />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
