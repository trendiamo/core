import AppBar from './app-bar'
import auth from 'auth'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from './menu'
import React from 'react'
import Sidebar from './sidebar'
import theme from 'app/theme'
import { branch, compose, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles'
import { styles } from './layout-styles'
import { withRouter } from 'react-router'

const Layout = ({ children, classes, dashboard, logout, open, toggleOpen }) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <CssBaseline />
      <AppBar classes={classes} logout={logout} open={open} toggleOpen={toggleOpen} />
      <main className={classes.contentWithSidebar}>
        <Sidebar classes={classes} open={open} toggleOpen={toggleOpen}>
          <Menu classes={classes} hasDashboard={!!dashboard} logout={logout} open={open} />
        </Sidebar>
        <div className={classes.content}>
          <div className={classes.contentInnerDiv}>{children}</div>
        </div>
      </main>
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

const EnhancedLayout = compose(
  withState('open', 'setOpen', true),
  withRouter,
  withHandlers({
    toggleOpen: ({ open, setOpen }) => () => setOpen(!open),
  }),
  withStyles(styles, { index: 1 }),
  withProps(() => ({
    isLoggedIn: auth.isLoggedIn(),
  })),
  branch(({ isLoggedIn }) => !isLoggedIn, renderComponent(props => <EmptyLayout {...props} />))
)(Layout)

const LayoutWithTheme = ({ ...rest }) => (
  <MuiThemeProvider theme={theme}>
    <EnhancedLayout {...rest} />
  </MuiThemeProvider>
)

export default LayoutWithTheme
