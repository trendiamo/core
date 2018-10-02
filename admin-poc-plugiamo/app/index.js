import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { Admin, GET_LIST, Resource } from 'react-admin'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from './expositions'
import { VideosList } from './videos'
import buildOpenCrudProvider, { buildQuery } from 'ra-data-opencrud'
import Hello from './hello'
import Home from './home'
import { HttpLink } from 'apollo-link-http'
import authProvider from './auth/index'
import buildOpenCrudProvider from 'ra-data-opencrud'
// import customRoutes from './custom-routes'
import { ExpositionsList } from './expositions'
import { HttpLink } from 'apollo-link-http'
import React from 'react'
import { setContext } from 'apollo-link-context'
import { Admin, Resource } from 'react-admin'
import { compose, lifecycle, withState } from 'recompose'

const App = ({ dataProvider, authProvider }) => (
  <div>
    {!dataProvider && <div>{'Loading'}</div>}
    {dataProvider && (
      <Admin dataProvider={dataProvider.dataProvider}>
        <Resource
          create={ExpositionsCreate}
          edit={ExpositionsEdit}
          list={ExpositionsList}
          name="Exposition"
          show={ExpositionShow}
        />
        <Resource list={VideosList} name="Video" />
      </Admin>
    )}
  </div>
)

export default compose(
  withState('dataProvider', 'setDataProvider', null),
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
          // uri: uriAdmin,
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
