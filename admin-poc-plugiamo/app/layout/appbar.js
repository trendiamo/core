import classNames from 'classnames'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import { toggleSidebar as toggleSidebarAction } from 'ra-core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { UserMenu } from 'react-admin'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import React, { cloneElement } from 'react'

const styles = theme => ({
  menuButton: {
    marginLeft: '0.5em',
    marginRight: '0.5em',
  },
  menuButtonIconClosed: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  menuButtonIconOpen: {
    transform: 'rotate(180deg)',
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  title: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toolbar: {
    paddingRight: 24,
  },
})

const CustomAppBarJSX = ({ classes, className, logout, open, userMenu, toggleSidebar, width, ...rest }) => (
  <MuiAppBar className={className} color="secondary" position="static" {...rest}>
    <Toolbar className={classes.toolbar} disableGutters variant={width === 'xs' ? 'regular' : 'dense'}>
      <IconButton
        aria-label="open drawer"
        className={classNames(classes.menuButton)}
        color="inherit"
        onClick={toggleSidebar}
      >
        <MenuIcon
          classes={{
            root: open ? classes.menuButtonIconOpen : classes.menuButtonIconClosed,
          }}
        />
      </IconButton>
      <Typography className={classes.title} color="inherit" id="react-admin-title" variant="title" />
      <Typography
        className={classes.userEmail}
        color="inherit"
        noWrap
        variant="subheading"
      >{`logged on as: ${localStorage.getItem('authEmail')}`}</Typography>
      {cloneElement(userMenu, { logout })}
    </Toolbar>
  </MuiAppBar>
)

CustomAppBarJSX.defaultProps = {
  userMenu: <UserMenu />,
}

const CustomAppBar = compose(
  connect(
    state => ({
      locale: state.i18n.locale, // force redraw on locale change
    }),
    {
      toggleSidebar: toggleSidebarAction,
    }
  ),
  withWidth()
)(CustomAppBarJSX)

export default withStyles(styles)(CustomAppBar)
