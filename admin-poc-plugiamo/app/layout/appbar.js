import { compose } from 'recompose'
import InputLabel from '@material-ui/core/InputLabel'
import React from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import withStyles from '@material-ui/core/styles/withStyles'
import { AppBar, MenuItemLink, UserMenu } from 'react-admin'

const styles = theme => ({
  userEmail: {
    margin: theme.spacing.unit * 30,
  },
})

const CustomUserMenuJSX = props => (
  <div>
    <UserMenu {...props}>
      <InputLabel>{`hello: ${localStorage.getItem('authEmail')}`}</InputLabel>
      {/* <MenuItemLink leftIcon={<SettingsIcon />} primaryText="Configuration" to="/configuration" /> */}
    </UserMenu>
  </div>
)

const StyledCustomUserMenuJSX = withStyles(styles)(CustomUserMenuJSX)

const CustomUserMenu = compose()(StyledCustomUserMenuJSX)

const CustomAppBar = props => <AppBar {...props} title="customAppBar" userMenu={<CustomUserMenu />} />

export default CustomAppBar
