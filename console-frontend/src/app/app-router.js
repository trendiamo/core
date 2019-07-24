import Account from 'app/screens/account'
import Accounts from 'app/screens/accounts/accounts-list'
import DataDashboard from 'app/screens/data-dashboard'
import ForgotPassword from 'auth/forgot-password'
import LoginPage from 'auth/login'
import NewAccount from 'app/screens/accounts/account-new'
import NotFound from 'app/screens/not-found'
import React from 'react'
import RequestPasswordReset from 'auth/forgot-password/request-password-reset'
import routes from './routes'
import SignupConfirmPage from 'auth/signup/confirm'
import SignupPage from 'auth/signup'
import UrlGenerator from 'app/screens/url-generator'
import WebsiteSettings from 'app/screens/website-settings'
import WelcomePage from 'app/screens/welcome'
import { AccountRedirect, ExternalRoute, PrivateRoute, RootRedirect } from './app-router-helpers'
import { OutroCreate, OutroEdit, OutrosList } from './resources/outros'
import { PersonaCreate, PersonaEdit, PersonasList } from './resources/personas'
import { PicturesList } from './resources/pictures'
import { Route, Switch } from 'react-router-dom'
import { ShowcaseCreate, ShowcaseEdit, ShowcasesList } from './resources/showcases'
import { SimpleChatCreate, SimpleChatEdit, SimpleChatsList } from './resources/simple-chats'
import { TriggerCreate, TriggerEdit, TriggersList } from './resources/triggers'
import { UserInvite } from 'app/screens/account/users'

const AppRouter = ({ fetchedAccount, setFetchedAccount }) => {
  return (
    <Switch>
      <PrivateRoute
        component={PersonasList}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.personasList(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={PersonaCreate}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.personaCreate(':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={PersonaEdit}
        exact
        fetchedAccount={fetchedAccount}
        isOwnerScoped
        path={routes.personaEdit(':personaId', ':accountSlug')}
        setFetchedAccount={setFetchedAccount}
      />
      <PrivateRoute
        component={PicturesList}
        exact
        fetchedAccount={fetchedAccount}
        path={routes.picturesList(':accountSlug')}
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

      <Route component={RootRedirect} exact path={routes.root()} />
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter
