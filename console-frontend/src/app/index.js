import authProvider from './auth'
import buildOpenCrudProvider from 'ra-data-opencrud'
import CustomLayout from './layout'
import customLoginPage from './screens/login'
import customLogoutButton from './screens/logout'
import customRoutes from './ext/custom-routes.js'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from './resources/expositions'

const App = ({ dataProvider, history }) => (
  <Admin
    appLayout={CustomLayout}
    authProvider={authProvider}
    customRoutes={customRoutes}
    dataProvider={dataProvider.dataProvider}
    history={history}
    loginPage={customLoginPage}
    logoutButton={customLogoutButton}
  >
    <Resource
      create={ExpositionsCreate}
      edit={ExpositionsEdit}
      list={ExpositionsList}
      name="Exposition"
      show={ExpositionShow}
    />
  </Admin>
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
