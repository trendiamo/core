import Account from 'app/screens/account'
import auth from 'auth'
import ChangePassword from 'app/screens/change-password'
import ForgotPassword from 'auth/forgot-password'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from './routes'
import theme from 'app/theme'
import WelcomePage from 'app/screens/welcome'
import { apiGetCsrfToken, apiRequest } from 'utils'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { CurationCreate, CurationEdit, CurationsList } from './resources/curations'
import { NavigationCreate, NavigationEdit, NavigationsList } from './resources/navigations'
import { OutroCreate, OutroEdit, OutrosList } from './resources/outros'
import { PersonaCreate, PersonaEdit, PersonasList } from './resources/personas'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { ScriptedChatCreate, ScriptedChatEdit, ScriptedChatsList } from './resources/scripted-chats'
import { SnackbarProvider } from 'notistack'
import { TriggerCreate, TriggerEdit, TriggersList } from './resources/triggers'
import { withSnackbar } from 'notistack'
import { withStoreProvider } from 'ext/recompose/with-store'
import 'assets/css/fonts.css'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

// Auth protected route.
const PrivateRoute = ({ component, path, ...props }) => (
  <Route
    {...props}
    path={path}
    render={({ match }) =>
      auth.isLoggedIn() ? React.createElement(component, { match }) : <Redirect to={routes.login()} />
    }
  />
)

const ExternalRoute = ({ component, path, ...props }) => (
  <Route
    {...props}
    path={path}
    render={() => (auth.isLoggedIn() ? <Redirect to={routes.root()} /> : React.createElement(component))}
  />
)

const RedirectRoot = () => (
  <React.Fragment>{<Redirect to={auth.isLoggedIn() ? routes.triggersList() : routes.login()} />}</React.Fragment>
)

const Routes = () => (
  <Switch>
    <PrivateRoute component={PersonasList} exact path={routes.personasList()} />
    <PrivateRoute component={PersonaCreate} exact path={routes.personaCreate()} />
    <PrivateRoute component={PersonaEdit} exact path={routes.personaEdit(':personaId')} />
    <PrivateRoute component={CurationsList} exact path={routes.curationsList()} />
    <PrivateRoute component={CurationCreate} exact path={routes.curationCreate()} />
    <PrivateRoute component={CurationEdit} exact path={routes.curationEdit(':curationId')} />
    <PrivateRoute component={ScriptedChatsList} exact path={routes.scriptedChatsList()} />
    <PrivateRoute component={ScriptedChatCreate} exact path={routes.scriptedChatCreate()} />
    <PrivateRoute component={ScriptedChatEdit} exact path={routes.scriptedChatEdit(':scriptedChatId')} />
    <PrivateRoute component={OutrosList} exact path={routes.outrosList()} />
    <PrivateRoute component={OutroCreate} exact path={routes.outroCreate()} />
    <PrivateRoute component={OutroEdit} exact path={routes.outroEdit(':outroId')} />
    <PrivateRoute component={NavigationsList} exact path={routes.navigationsList()} />
    <PrivateRoute component={NavigationCreate} exact path={routes.navigationCreate()} />
    <PrivateRoute component={NavigationEdit} exact path={routes.navigationEdit(':navigationId')} />
    <PrivateRoute component={TriggersList} exact path={routes.triggersList()} />
    <PrivateRoute component={TriggerCreate} exact path={routes.triggerCreate()} />
    <PrivateRoute component={TriggerEdit} exact path={routes.triggerEdit(':triggerId')} />
    <PrivateRoute component={Account} exact path={routes.account()} />
    <PrivateRoute component={ChangePassword} exact path={routes.passwordChange()} />
    <ExternalRoute component={LoginPage} path={routes.login()} />
    <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
    <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />
    <Route
      component={auth.isLoggedIn() && auth.getUser().onboardingStage === 0 ? WelcomePage : RedirectRoot}
      exact
      path={routes.root()}
    />
    <Route component={NotFound} />
  </Switch>
)

const AppBase = compose(
  withState('loading', 'setLoading', true),
  withSnackbar,
  lifecycle({
    componentDidMount() {
      const { enqueueSnackbar, setLoading } = this.props
      apiRequest(apiGetCsrfToken, [], {
        enqueueSnackbar,
      }).then(response => {
        setLoading(false)
        response && auth.setCsrfToken(response)
      })
    },
  }),
  branch(({ loading }) => loading, renderNothing)
)(() => (
  <>
    <CssBaseline />
    <Layout>
      <Routes />
    </Layout>
  </>
))

/* eslint-disable react/jsx-max-depth */
export const App = ({ history }) => (
  <Router history={history}>
    <JssProvider generateClassName={generateClassName} jss={jss}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }} maxSnack={3}>
          <AppBase />
        </SnackbarProvider>
      </MuiThemeProvider>
    </JssProvider>
  </Router>
)
/* eslint-enable react/jsx-max-depth */

export default compose(withStoreProvider)(App)
