import AppBar from './appbar'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import React from 'react'
import Sidebar from './sidebar'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'
import { Error, Loading, Notification } from 'react-admin'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.staticContext
  delete newProps.history
  delete newProps.location
  delete newProps.match
  return newProps
}

const Layout = ({
  children,
  classes,
  dashboard,
  logout,
  isLoading,
  open,
  title,
  hasError,
  errorMessage,
  errorInfo,
  ...props
}) => (
  <div className={classes.root} {...sanitizeProps(props)}>
    <div className={classes.appFrame}>
      <CssBaseline />
      <AppBar classes={classes} logout={logout} open={open} title={title} />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes}>
          <Menu hasDashboard={!!dashboard} logout={logout} />
        </Sidebar>
        <div className={classes.content}>
          {isLoading ? <Loading /> : null}
          {hasError ? <Error error={errorMessage} errorInfo={errorInfo} title={title} /> : children}
        </div>
      </main>
      <Notification />
    </div>
  </div>
)

const mapStateToProps = state => ({
  isLoading: state.admin.loading > 0,
  open: state.admin.ui.sidebarOpen,
})

const EnhancedLayout = compose(
  connect(
    mapStateToProps,
    {}
  ),
  withRouter,
  withStyles(styles, { index: 1 })
)(Layout)

const LayoutWithTheme = ({ theme, ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <EnhancedLayout {...rest} />
  </MuiThemeProvider>
)

export default LayoutWithTheme
