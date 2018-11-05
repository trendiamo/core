import Account from 'app/screens/account'
import ChangePassword from 'app/screens/change-password'
import { create } from 'jss'
import ForgotPassword from 'auth/forgot-password'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import { Route } from 'react-router-dom'
import routes from './routes'
import theme from './theme'
import { Admin, Resource } from 'react-admin'
import auth, { authProvider } from 'auth'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { InfluencersCreate, InfluencersEdit, InfluencerShow, InfluencersList } from './resources/influencers'
import 'assets/css/fonts.css'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const customRoutes = [
  <Route component={RequestPasswordReset} exact key="passwordReset" noLayout path={routes.requestPasswordReset()} />,
  <Route component={ForgotPassword} exact key="passwordReset" noLayout path={routes.passwordReset()} />,
  <Route component={ChangePassword} exact key="passwordReset" path={routes.passwordChange()} />,
  <Route component={Account} exact key="account" path={routes.account()} />,
]

// Here isLoggedIn property is passed in order to inform the <Layout /> whether to show Menus and Bars (404 page needs that)
const LayoutWithProps = ({ ...props }) => <Layout isLoggedIn={auth.isLoggedIn()} {...props} />

const App = ({ dataProvider, history }) => (
  <JssProvider generateClassName={generateClassName} jss={jss}>
    <Admin
      appLayout={LayoutWithProps}
      authProvider={authProvider}
      catchAll={NotFound}
      customRoutes={customRoutes}
      dataProvider={dataProvider}
      history={history}
      loginPage={LoginPage}
      theme={theme}
    >
      <Resource
        create={InfluencersCreate}
        edit={InfluencersEdit}
        list={InfluencersList}
        name="influencers"
        show={InfluencerShow}
      />
    </Admin>
  </JssProvider>
)

export default App
