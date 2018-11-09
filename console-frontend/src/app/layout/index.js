import AppBar from './app-bar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Loading from 'app/layout/loading'
import Menu from './menu'
import React from 'react'
import Sidebar from './sidebar'
import { branch, compose, renderComponent, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { Error, Notification } from 'react-admin'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'

const Layout = ({
  children,
  classes,
  dashboard,
  logout,
  isLoading,
  open,
  hasError,
  errorMessage,
  errorInfo,
  toggleOpen,
}) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <CssBaseline />
      <AppBar classes={classes} logout={logout} open={open} toggleOpen={toggleOpen} />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes} open={open} toggleOpen={toggleOpen}>
          <Menu classes={classes} hasDashboard={!!dashboard} logout={logout} open={open} />
        </Sidebar>
        <div className={classes.content}>
          {isLoading && <Loading classes={classes} />}
          {hasError ? (
            <Error error={errorMessage} errorInfo={errorInfo} />
          ) : (
            <div className={classes.contentInnerDiv}>{children}</div>
          )}
        </div>
      </main>
      <Notification />
    </div>
  </div>
)

const EmptyLayout = ({ classes, children }) => (
  <div className={classes.root}>
    <CssBaseline />
    <div className={classes.content}>
      <div className={classes.contentInnerDiv}>{children}</div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  isLoading: state.admin.loading > 0,
})

const EnhancedLayout = compose(
  withState('open', 'setOpen', true),
  connect(
    mapStateToProps,
    {}
  ),
  withRouter,
  withHandlers({
    toggleOpen: ({ open, setOpen }) => () => setOpen(!open),
  }),
  withStyles(styles, { index: 1 }),
  branch(({ isLoggedIn }) => !isLoggedIn, renderComponent(props => <EmptyLayout {...props} />))
)(Layout)

const LayoutWithTheme = ({ theme, ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <EnhancedLayout {...rest} />
  </MuiThemeProvider>
)

export default LayoutWithTheme
