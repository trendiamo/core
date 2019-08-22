import AffiliatePartners from 'app/screens/affiliate-partners'
import ForgotPassword from 'auth/forgot-password'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from 'app/routes'
import SignupConfirmPage from 'auth/signup/confirm'
import SignupPage from 'auth/signup'
import { ExternalRoute, PrivateRoute, RootRedirect } from './router-helpers'
import { Route, Switch } from 'react-router-dom'

const AppRouter = ({ fetchedAccount, setFetchedAccount }) => {
  return (
    <Switch>
      <PrivateRoute
        component={AffiliatePartners}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.affiliatePartners()}
        setFetchedAccount={setFetchedAccount}
      />

      <ExternalRoute component={LoginPage} path={routes.login()} />
      <ExternalRoute component={SignupPage} exact path={routes.signup()} />
      <ExternalRoute component={SignupConfirmPage} path={routes.signupConfirm()} />
      <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
      <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />

      <Route component={RootRedirect} exact path={routes.root()} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter
