import Account from 'app/screens/account'
import auth from 'auth'
import ChangePassword from 'app/screens/change-password'
import ForgotPassword from 'auth/forgot-password'
import InfluencerCreate from './resources/influencers/create'
import InfluencerEdit from './resources/influencers/edit'
import InfluencerShow from './resources/influencers/show'
import InfluencersList from './resources/influencers/list'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from './routes'
import theme from './theme'
import { create } from 'jss'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
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

const RedirectRoot = () => <React.Fragment>{!auth.isLoggedIn() && <Redirect to={routes.login()} />}</React.Fragment>

const Routes = () => (
  <Switch>
    <PrivateRoute component={InfluencerCreate} exact path="/influencers/create" />
    <PrivateRoute component={InfluencerShow} exact path="/influencers/:influencerId/show" />
    <PrivateRoute component={InfluencerEdit} exact path="/influencers/:influencerId/(|edit)" />
    <PrivateRoute component={Account} exact path={routes.account()} />
    <PrivateRoute component={ChangePassword} exact path={routes.passwordChange()} />
    <ExternalRoute component={LoginPage} path={routes.login()} />
    <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
    <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />
    <Route component={RedirectRoot} path={routes.root()} />
    <Route component={NotFound} />
  </Switch>
)

export const App = ({ history }) => (
  <Router history={history}>
    <JssProvider generateClassName={generateClassName} jss={jss}>
      <Layout isLoggedIn={auth.isLoggedIn()} theme={theme}>
        <Routes />
      </Layout>
    </JssProvider>
  </Router>
)

export default App
