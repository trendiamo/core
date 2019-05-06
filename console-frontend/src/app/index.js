import Account from 'app/screens/account'
import Admin from 'app/screens/admin'
import auth from 'auth'
import ChangePassword from 'app/screens/change-password'
import ForgotPassword from 'auth/forgot-password'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React, { useEffect, useState } from 'react'
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
import { OutroCreate, OutroEdit, OutrosList } from './resources/outros'
import { PersonaCreate, PersonaEdit, PersonasList } from './resources/personas'
import { PicturesList } from './resources/pictures'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { ShowcaseCreate, ShowcaseEdit, ShowcasesList } from './resources/showcases'
import { SimpleChatCreate, SimpleChatEdit, SimpleChatsList } from './resources/simple-chats'
import { SnackbarProvider } from 'notistack'
import { StoreProvider } from 'ext/hooks/store'
import { TriggerCreate, TriggerEdit, TriggersList } from './resources/triggers'
import { useSnackbar } from 'notistack'
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
  <>{<Redirect to={auth.isLoggedIn() ? routes.triggersList() : routes.login()} />}</>
)

const Routes = () => (
  <Switch>
    <PrivateRoute component={PersonasList} exact path={routes.personasList()} />
    <PrivateRoute component={PersonaCreate} exact path={routes.personaCreate()} />
    <PrivateRoute component={PersonaEdit} exact path={routes.personaEdit(':personaId')} />
    <PrivateRoute component={PicturesList} exact path={routes.picturesList()} />
    <PrivateRoute component={ShowcasesList} exact path={routes.showcasesList()} />
    <PrivateRoute component={ShowcaseCreate} exact path={routes.showcaseCreate()} />
    <PrivateRoute component={ShowcaseEdit} exact path={routes.showcaseEdit(':showcaseId')} />
    <PrivateRoute component={SimpleChatsList} exact path={routes.simpleChatsList()} />
    <PrivateRoute component={SimpleChatCreate} exact path={routes.simpleChatCreate()} />
    <PrivateRoute component={SimpleChatEdit} exact path={routes.simpleChatEdit(':simpleChatId')} />
    <PrivateRoute component={OutrosList} exact path={routes.outrosList()} />
    <PrivateRoute component={OutroCreate} exact path={routes.outroCreate()} />
    <PrivateRoute component={OutroEdit} exact path={routes.outroEdit(':outroId')} />
    <PrivateRoute component={TriggersList} exact path={routes.triggersList()} />
    <PrivateRoute component={TriggerCreate} exact path={routes.triggerCreate()} />
    <PrivateRoute component={TriggerEdit} exact path={routes.triggerEdit(':triggerId')} />
    <PrivateRoute component={Account} exact path={routes.account()} />
    <PrivateRoute component={ChangePassword} exact path={routes.passwordChange()} />
    <PrivateRoute component={UrlGenerator} exact path={routes.urlGenerator()} />
    <PrivateRoute component={Admin} exact path={routes.admin()} />
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

/* eslint-disable react/jsx-max-depth */
export const App = ({ history }) => (
  <StoreProvider>
    <Router history={history}>
      <JssProvider generateClassName={generateClassName} jss={jss}>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} maxSnack={3}>
            <AppBase />
          </SnackbarProvider>
        </MuiThemeProvider>
      </JssProvider>
    </Router>
  </StoreProvider>
)
/* eslint-enable react/jsx-max-depth */

export default App
