import Account from 'app/screens/account'
import Accounts from 'app/screens/accounts/accounts-list'
import CookiePolicy from 'app/screens/cookie-policy'
import DataDashboard from 'app/screens/data-dashboard'
import ForgotPassword from 'auth/forgot-password'
import LoginPage from 'auth/login'
import NewAccount from 'app/screens/accounts/account-new'
import NotFound from 'app/screens/not-found'
import PrivacyPolicy from 'app/screens/privacy-policy'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from 'app/routes'
import SignupConfirmPage from 'auth/signup/confirm'
import SignupPage from 'auth/signup'
import TermsAndConditions from 'app/screens/terms-and-conditions'
import UrlGenerator from 'app/screens/url-generator'
import WebsiteSettings from 'app/screens/website-settings'
import WelcomePage from 'app/screens/welcome'
import { AccountRedirect, ExternalRoute, PrivateRoute, RootRedirect } from './router-helpers'
import { ImagesList } from 'app/resources/images'
import { OutroCreate, OutroEdit, OutrosList } from 'app/resources/outros'
import { Route, Switch } from 'react-router-dom'
import { SellerCreate, SellerEdit, SellersList } from 'app/resources/sellers'
import { ShowcaseCreate, ShowcaseEdit, ShowcasesList } from 'app/resources/showcases'
import { SimpleChatCreate, SimpleChatEdit, SimpleChatShow, SimpleChatsList } from 'app/resources/simple-chats'
import { TriggerCreate, TriggerEdit, TriggersList } from 'app/resources/triggers'
import { UserInvite } from 'app/screens/account/users'

const AppRouter = ({ fetchedAccount, setFetchedAccount }) => {
  return (
    <Switch>
      <PrivateRoute
        component={SellersList}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.sellersList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SellerCreate}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.sellerCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SellerEdit}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.sellerEdit(':sellerId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={ImagesList}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.imagesList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={ShowcasesList}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.showcasesList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={ShowcaseCreate}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.showcaseCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={ShowcaseEdit}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.showcaseEdit(':showcaseId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatsList}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.simpleChatsList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatCreate}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.simpleChatCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatEdit}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.simpleChatEdit(':simpleChatId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={SimpleChatShow}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.simpleChatShow(':simpleChatId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={OutrosList}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.outrosList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={OutroCreate}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.outroCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={OutroEdit}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.outroEdit(':outroId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={TriggersList}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.triggersList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={TriggerCreate}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.triggerCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={TriggerEdit}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.triggerEdit(':triggerId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={Account}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.settingsAccount(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={UserInvite}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.userInvite()}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={UrlGenerator}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.urlGenerator(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute component={Accounts} exact path={routes.accounts()} />
      <PrivateRoute component={NewAccount} exact isAdminScoped path={routes.newAccount()} />
      <PrivateRoute
        component={DataDashboard}
        exact
        fetchedAccount={fetchedAccount}
        isAdminScoped
        path={routes.dataDashboard(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={AccountRedirect}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.accountRoot(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={WebsiteSettings}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.settingsTheme(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={WelcomePage}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.welcome(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />

      <ExternalRoute component={LoginPage} path={routes.login()} />
      <ExternalRoute component={SignupPage} exact path={routes.signup()} />
      <ExternalRoute component={SignupConfirmPage} path={routes.signupConfirm()} />
      <ExternalRoute component={RequestPasswordReset} path={routes.requestPasswordReset()} />
      <ExternalRoute component={ForgotPassword} path={routes.passwordReset()} />

      <Route component={TermsAndConditions} exact path={routes.termsAndConditions()} />
      <Route component={PrivacyPolicy} exact path={routes.privacyPolicy()} />
      <Route component={CookiePolicy} exact path={routes.cookiePolicy()} />
      <Route component={RootRedirect} exact path={routes.root()} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter
