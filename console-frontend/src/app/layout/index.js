import AppBar from './app-bar'
import { connect } from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import React from 'react'
import Sidebar from './sidebar'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'
import { compose, withHandlers, withState } from 'recompose'
import { Error, Loading, Notification } from 'react-admin'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'

const sanitizeProps = props => {
  const newProps = { ...props }
  delete newProps.staticContext
  delete newProps.history
  delete newProps.location
  delete newProps.match
  delete newProps.title
  delete newProps.setOpen
  return newProps
}

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
  ...props
}) => (
  <div className={classes.root} {...sanitizeProps(props)}>
    <div className={classes.appFrame}>
      <CssBaseline />
      <AppBar classes={classes} logout={logout} open={open} toggleOpen={toggleOpen} />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes} open={open} toggleOpen={toggleOpen}>
          <Menu classes={classes} hasDashboard={!!dashboard} logout={logout} />
        </Sidebar>
        <div className={classes.content}>
          {isLoading && <Loading />}
          {hasError ? (
            <Error error={errorMessage} errorInfo={errorInfo} />
          ) : (
            <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>{children}</div>
          )}
        </div>
      </main>
      <Notification />
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
  withStyles(styles, { index: 1 })
)(Layout)

const LayoutWithTheme = ({ theme, ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <EnhancedLayout {...rest} />
  </MuiThemeProvider>
)

export default LayoutWithTheme
