import authProvider from './auth'
import buildOpenCrudProvider from 'ra-data-opencrud'
import customLoginPage from './login'
import customRoutes from './ext/custom-routes'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import { setContext } from 'apollo-link-context'
import { VideosList } from './videos'
import { Admin, Resource } from 'react-admin'
import { compose, lifecycle, withState } from 'recompose'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from './expositions'

const App = ({ dataProvider }) => (
  <div>
    {!dataProvider && <div>{'Loading'}</div>}
    {dataProvider && (
      <Admin
        authProvider={authProvider}
        customRoutes={customRoutes}
        dataProvider={dataProvider.dataProvider}
        loginPage={customLoginPage}
      >
        <Resource
          create={ExpositionsCreate}
          edit={ExpositionsEdit}
          list={ExpositionsList}
          name="Exposition"
          show={ExpositionShow}
        />
        {/* <Resource list={VideosList} name="Video" /> */}
      </Admin>
    )}
  </div>
)

export default compose(
  withState('dataProvider', 'setDataProvider', null),
  withState('isLoggedIn', 'setIsloggedIn', null),
  lifecycle({
    componentDidMount() {
      const { setDataProvider } = this.props
      const uriPlugAdmin = `https://${process.env.API_ENDPOINT}/graphql`
      const authLink = setContext((_, { headers }) => ({
        headers: {
          ...headers,
          'X-USER-EMAIL': localStorage.getItem('authEmail'),
          'X-USER-TOKEN': localStorage.getItem('authToken'),
        },
      }))
      buildOpenCrudProvider({
        clientOptions: {
          link: authLink.concat(new HttpLink({ uri: uriPlugAdmin })),
        },
      })
        .then(dataProvider => {
          setDataProvider({ dataProvider })
        })
        .catch(reason => console.log(reason))
    },
  })
)(App)
