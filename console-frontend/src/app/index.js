import authProvider from './auth'
import buildOpenCrudProvider from 'ra-data-opencrud'
import { create } from 'jss'
import CustomLayout from './layout'
import customLoginPage from './screens/login'
import customRoutes from './ext/custom-routes.js'
import JssProvider from 'react-jss/lib/JssProvider'
import React from 'react'
import { Admin, Resource } from 'react-admin'
import { branch, compose, lifecycle, renderNothing, withState } from 'recompose'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from './resources/expositions'

const generateClassName = createGenerateClassName()
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
})

const App = ({ dataProvider, history }) => (
  <JssProvider generateClassName={generateClassName} jss={jss}>
    <Admin
      appLayout={CustomLayout}
      authProvider={authProvider}
      customRoutes={customRoutes}
      dataProvider={dataProvider.dataProvider}
      history={history}
      loginPage={customLoginPage}
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
