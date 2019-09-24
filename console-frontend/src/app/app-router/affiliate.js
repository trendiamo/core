import AffiliatePartners from 'app/screens/affiliate-partners'
import ContentCreation from 'app/screens/content-creation'
import CookiePolicy from 'app/screens/cookie-policy'
import ForgotPassword from 'auth/forgot-password'
import LoginPage from 'auth/login'
import NotFound from 'app/screens/not-found'
import PrivacyPolicy from 'app/screens/privacy-policy'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import Revenues from 'app/screens/revenues'
import routes from 'app/routes'
import SignupConfirmPage from 'auth/signup/confirm'
import SignupPage from 'auth/signup'
import TermsAndConditions from 'app/screens/terms-and-conditions'
import YourReferrals from 'app/screens/your-referrals'
import { ExternalRoute, PrivateRoute, RootRedirect } from './router-helpers'
import { Route, Switch } from 'react-router-dom'
import { SimpleChatCreate, SimpleChatEdit, SimpleChatsList } from 'app/resources/simple-chats'

const AppRouter = ({ fetchedAccount, setFetchedAccount }) => {
  return (
    <Switch>
      <PrivateRoute
        component={Revenues}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.revenues()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={AffiliatePartners}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.affiliatePartners()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={YourReferrals}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.yourReferrals()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={ContentCreation}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.contentCreation()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatsList}
        exact
        fetchedAccount={fetchedAccount}
        isSellerScoped
        path={routes.simpleChatsList()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatCreate}
        exact
        fetchedAccount={fetchedAccount}
        isSellerScoped
        path={routes.simpleChatCreate()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatEdit}
        exact
        fetchedAccount={fetchedAccount}
        isSellerScoped
        path={routes.simpleChatEdit(':simpleChatId')}
        setFetchedAccount={setFetchedAccount}
      />

      <ExternalRoute component={LoginPage} path={routes.login()} />
      <ExternalRoute component={SignupPage} exact path={routes.signup()} />
      <ExternalRoute component={SignupConfirmPage} path={routes.signupConfirm()} />
      <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
      <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />
      <ExternalRoute component={TermsAndConditions} exact path={routes.termsAndConditions()} />
      <ExternalRoute component={PrivacyPolicy} exact path={routes.privacyPolicy()} />
      <ExternalRoute component={CookiePolicy} exact path={routes.cookiePolicy()} />

      <Route component={RootRedirect} exact path={routes.root()} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter
