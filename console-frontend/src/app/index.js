import { authProvider } from 'app/auth'
import buildOpenCrudProvider from 'ra-data-opencrud'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import Layout from 'app/layout'
import LoginPage from 'app/screens/login'
import PasswordReset from 'app/screens/password-reset'
import React from 'react'
import RequestPasswordReset from 'app/screens/password-reset/request-password-reset'
import { Route } from 'react-router-dom'
import { Admin, Resource } from 'react-admin'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from 'app/resources/expositions'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
})

const routes = [
  <Route component={RequestPasswordReset} exact key="passwordReset" noLayout path="/request_password_reset" />,
  <Route component={PasswordReset} exact key="passwordReset" noLayout path="/password_reset" />,
]

const App = ({ dataProvider, history }) => (
  <JssProvider generateClassName={generateClassName} jss={jss}>
    <Admin
      appLayout={Layout}
      authProvider={authProvider}
      customRoutes={routes}
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
