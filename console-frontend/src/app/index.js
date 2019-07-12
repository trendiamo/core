import Account from 'app/screens/account'
import Accounts from 'app/screens/accounts'
import auth from 'auth'
import ChangePassword from 'app/screens/change-password'
import DataDashboard from 'app/screens/data-dashboard'
import DateFnsUtils from '@date-io/date-fns'
import ForgotPassword from 'auth/forgot-password'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React, { useCallback, useEffect, useState } from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from './routes'
import theme from 'app/theme'
import UrlGenerator from 'app/screens/url-generator'
import WelcomePage from 'app/screens/welcome'
import { apiGetCsrfToken, apiRequest } from 'utils'
import { create } from 'jss'
import { createGenerateClassName, jssPreset, MuiThemeProvider } from '@material-ui/core/styles'
import { createGlobalStyle } from 'styled-components'
import { CssBaseline } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { OutroCreate, OutroEdit, OutrosList } from './resources/outros'
import { PersonaCreate, PersonaEdit, PersonasList } from './resources/personas'
import { PicturesList } from './resources/pictures'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { ShowcaseCreate, ShowcaseEdit, ShowcasesList } from './resources/showcases'
import { SimpleChatCreate, SimpleChatEdit, SimpleChatsList } from './resources/simple-chats'
import { SnackbarProvider } from 'notistack'
import { StoreProvider } from 'ext/hooks/store'
import { TriggerCreate, TriggerEdit, TriggersList } from './resources/triggers'
import { UserCreate } from 'app/screens/account/users'
import { useSnackbar } from 'notistack'
import 'assets/css/fonts.css'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

// Auth protected route.
const PrivateRoute = ({ component, isAdminScoped, isOwnerScoped, path, ...props }) => {
  const render = useCallback(
    ({ match }) =>
      auth.isLoggedIn() ? (
        (isOwnerScoped && auth.isRole('editor')) ||
        (isAdminScoped && !auth.isAdmin()) ||
        (path === routes.dataDashboard() && !auth.getSessionAccount().websitesAttributes[0].isECommerce) ? (
          React.createElement(NotFound, { match })
        ) : (
          React.createElement(component, { match })
        )
      ) : (
        <Redirect to={routes.login()} />
      ),
    [component, isAdminScoped, isOwnerScoped, path]
  )

  return <Route {...props} path={path} render={render} />
}

const ExternalRoute = ({ component, path, ...props }) => {
  const render = useCallback(
    () => (auth.isLoggedIn() ? <Redirect to={routes.root()} /> : React.createElement(component)),
    [component]
  )
  return <Route {...props} path={path} render={render} />
}

const RedirectRoot = () => (
  <>
    {
      <Redirect
        to={
          auth.isLoggedIn()
            ? auth.isRole('editor')
              ? routes.simpleChatsList()
              : routes.triggersList()
            : routes.login()
        }
      />
    }
  </>
)

const Routes = () => (
  <Switch>
    <PrivateRoute component={PersonasList} exact isOwnerScoped path={routes.personasList()} />
    <PrivateRoute component={PersonaCreate} exact isOwnerScoped path={routes.personaCreate()} />
    <PrivateRoute component={PersonaEdit} exact isOwnerScoped path={routes.personaEdit(':personaId')} />
    <PrivateRoute component={PicturesList} exact path={routes.picturesList()} />
    <PrivateRoute component={ShowcasesList} exact isOwnerScoped path={routes.showcasesList()} />
    <PrivateRoute component={ShowcaseCreate} exact isOwnerScoped path={routes.showcaseCreate()} />
    <PrivateRoute component={ShowcaseEdit} exact isOwnerScoped path={routes.showcaseEdit(':showcaseId')} />
    <PrivateRoute component={SimpleChatsList} exact path={routes.simpleChatsList()} />
    <PrivateRoute component={SimpleChatCreate} exact path={routes.simpleChatCreate()} />
    <PrivateRoute component={SimpleChatEdit} exact path={routes.simpleChatEdit(':simpleChatId')} />
    <PrivateRoute component={OutrosList} exact isOwnerScoped path={routes.outrosList()} />
    <PrivateRoute component={OutroCreate} exact isOwnerScoped path={routes.outroCreate()} />
    <PrivateRoute component={OutroEdit} exact isOwnerScoped path={routes.outroEdit(':outroId')} />
    <PrivateRoute component={TriggersList} exact isOwnerScoped path={routes.triggersList()} />
    <PrivateRoute component={TriggerCreate} exact isOwnerScoped path={routes.triggerCreate()} />
    <PrivateRoute component={TriggerEdit} exact isOwnerScoped path={routes.triggerEdit(':triggerId')} />
    <PrivateRoute component={Account} exact path={routes.account()} />
    <PrivateRoute component={UserCreate} exact isAdminScoped isOwnerScoped path={routes.userCreate()} />
    <PrivateRoute component={ChangePassword} exact isOwnerScoped path={routes.passwordChange()} />
    <PrivateRoute component={UrlGenerator} exact isOwnerScoped path={routes.urlGenerator()} />
    <PrivateRoute component={Accounts} exact isOwnerScoped path={routes.accounts()} />
    <PrivateRoute component={DataDashboard} exact isAdminScoped path={routes.dataDashboard()} />
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

const SortableStyle = createGlobalStyle`
  .sortable-element {
    z-index: 1;
  }
`

const AppBase = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(true)
  useEffect(
    () => {
      apiRequest(apiGetCsrfToken, []).then(({ json, errors, requestError }) => {
        setLoading(false)
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (!requestError && !errors) auth.setCsrfToken(json)
      })
    },
    [enqueueSnackbar, setLoading]
  )
  if (loading) return null

  return (
    <>
      <CssBaseline />
      <SortableStyle />
      <Layout>
        <Routes />
      </Layout>
    </>
  )
}

const anchorOrigin = { vertical: 'bottom', horizontal: 'right' }

/* eslint-disable react/jsx-max-depth */
export const App = ({ history }) => (
  <StoreProvider>
    <Router history={history}>
      <JssProvider generateClassName={generateClassName} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SnackbarProvider anchorOrigin={anchorOrigin} maxSnack={3}>
              <AppBase />
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </JssProvider>
    </Router>
  </StoreProvider>
)
/* eslint-enable react/jsx-max-depth */

export default App
