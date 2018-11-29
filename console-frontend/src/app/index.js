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
import { apiGetCsrfToken } from 'utils'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { CurationsList } from './resources/curations'
import { OutroCreate, OutroEdit, OutroShow, OutrosList } from './resources/outros'
import { PersonaCreate, PersonaEdit, PersonaShow, PersonasList } from './resources/personas'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { ScriptedChatsList } from './resources/scripted-chats'
import { TriggerCreate, TriggerEdit, TriggersList } from './resources/triggers'
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
  <React.Fragment>{<Redirect to={auth.isLoggedIn() ? routes.personasList() : routes.login()} />}</React.Fragment>
)

const Routes = () => (
  <Switch>
    <PrivateRoute component={PersonasList} exact path={routes.personasList()} />
    <PrivateRoute component={PersonaCreate} exact path={routes.personaCreate()} />
    <PrivateRoute component={PersonaShow} exact path={routes.personaShow(':personaId')} />
    <PrivateRoute component={PersonaEdit} exact path={routes.personaEdit(':personaId')} />
    <PrivateRoute component={CurationsList} exact path={routes.curationsList()} />
    <PrivateRoute component={ScriptedChatsList} exact path={routes.scriptedChatsList()} />
    <PrivateRoute component={OutrosList} exact path={routes.outrosList()} />
    <PrivateRoute component={OutroCreate} exact path={routes.outroCreate()} />
    <PrivateRoute component={OutroEdit} exact path={routes.outroEdit(':outroId')} />
    <PrivateRoute component={OutroShow} exact path={routes.outroShow(':outroId')} />
    <PrivateRoute component={TriggersList} exact path={routes.triggersList()} />
    <PrivateRoute component={TriggerCreate} exact path={routes.triggerCreate()} />
    <PrivateRoute component={TriggerEdit} exact path={routes.triggerEdit(':triggerId')} />
    <PrivateRoute component={Account} exact path={routes.account()} />
    <PrivateRoute component={ChangePassword} exact path={routes.passwordChange()} />
    <ExternalRoute component={LoginPage} path={routes.login()} />
    <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
    <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />
    <Route component={RedirectRoot} exact path={routes.root()} />
    <Route component={NotFound} />
  </Switch>
)

export const App = ({ history }) => (
  <Router history={history}>
    <JssProvider generateClassName={generateClassName} jss={jss}>
      <Layout>
        <Routes />
      </Layout>
    </JssProvider>
  </Router>
)

export default compose(
  withState('loading', 'setLoading', true),
  lifecycle({
    componentWillMount() {
      const { setLoading } = this.props
      apiGetCsrfToken().then(() => {
        setLoading(false)
      })
    },
  }),
  branch(({ loading }) => loading, renderNothing)
)(App)
