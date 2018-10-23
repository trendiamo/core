import ChangePassword from 'app/screens/change-password'
import { create } from 'jss'
import ForgotPassword from 'app/screens/forgot-password'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'app/screens/login'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'app/screens/forgot-password/request-password-reset'
import { Route } from 'react-router-dom'
import routes from './routes'
import WebsiteEdit from './resources/websites'
import { Admin, Resource } from 'react-admin'
import auth, { authProvider } from 'app/auth'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const customRoutes = [
  <Route component={RequestPasswordReset} exact key="passwordReset" noLayout path={routes.requestPasswordReset()} />,
  <Route component={ForgotPassword} exact key="passwordReset" noLayout path={routes.passwordReset()} />,
  <Route component={ChangePassword} exact key="passwordReset" path={routes.passwordChange()} />,
  <Route
    exact
    key="account"
    path={routes.account()}
    render={() => (
      <WebsiteEdit basePath="/websites" id={auth.getUser().websiteRef} location={{}} match={{}} resource="websites" />
    )}
  />,
]

const App = ({ dataProvider, history }) => (
  <JssProvider generateClassName={generateClassName} jss={jss}>
    <Admin
      appLayout={Layout}
      authProvider={authProvider}
      catchAll={NotFound}
      customRoutes={customRoutes}
      dataProvider={dataProvider}
      history={history}
      loginPage={LoginPage}
    >
      <Resource name="websites" />
    </Admin>
  </JssProvider>
)

export default App
