import buildOpenCrudProvider from 'ra-data-opencrud'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'app/screens/login'
import NotFound from 'app/screens/not-found'
import PasswordReset from 'app/screens/password-reset'
import React from 'react'
import RequestPasswordReset from 'app/screens/password-reset/request-password-reset'
import { Route } from 'react-router-dom'
import routes from './routes'
import WebsiteEdit from './resources/websites'
import { Admin, Resource } from 'react-admin'
import auth, { authProvider } from 'app/auth'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from 'app/resources/expositions'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
})

const customRoutes = [
  <Route component={RequestPasswordReset} exact key="passwordReset" noLayout path={routes.requestPasswordReset()} />,
  <Route component={PasswordReset} exact key="passwordReset" noLayout path={routes.passwordReset()} />,
  <Route
    exact
    key="account"
    path={routes.account()}
    render={() => (
      <WebsiteEdit basePath="/Website" id={auth.getUser().websiteRef} location={{}} match={{}} resource="Website" />
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
      dataProvider={dataProvider.dataProvider}
      history={history}
      loginPage={LoginPage}
    >
      <Resource
        create={ExpositionsCreate}
        edit={ExpositionsEdit}
        list={ExpositionsList}
        name="Exposition"
        show={ExpositionShow}
      />
      <Resource name="Website" />
    </Admin>
  </JssProvider>
)

export default compose(
  withState('dataProvider', 'setDataProvider', null),
  withState('isLoggedIn', 'setIsloggedIn', null),
  lifecycle({
    componentDidMount() {
      const { authLink, setDataProvider } = this.props
      buildOpenCrudProvider({ clientOptions: { link: authLink } })
        .then(dataProvider => setDataProvider({ dataProvider }))
        .catch(console.error)
    },
  }),
  branch(({ dataProvider }) => !dataProvider, renderNothing)
)(App)
