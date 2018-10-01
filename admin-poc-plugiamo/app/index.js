import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { Admin, GET_LIST, Resource } from 'react-admin'
import { ExpositionsCreate, ExpositionsEdit, ExpositionShow, ExpositionsList } from './expositions'
import { VideosList } from './videos'
import buildOpenCrudProvider, { buildQuery } from 'ra-data-opencrud'
import Hello from './hello'
import Home from './home'
import { HttpLink } from 'apollo-link-http'
import { ExpositionsList } from './expositions'
import React from 'react'
import { setContext } from 'apollo-link-context'
import { Admin, Resource } from 'react-admin'
import { compose, lifecycle, withState } from 'recompose'
import { Route, BrowserRouter as Router } from 'react-router-dom'
// import * as auth0 from 'auth0-js'

// var authClient = new auth0.WebAuth({
//   domain: "trendiamotest.eu.auth0.com",
//   clientID: "hYoRAaXXYH4megwBFLbpgxPvndVPEnkI",
// });

const RouterComponent = () => (
  <Router>
    <div>
      <Route component={Home} exac path="/" />
      <Route component={Hello} path="/hello" />
    </div>
  </Router>
)

const App = ({ dataProvider }) => (
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
          // 'X-USER-TOKEN': localStorage.getItem('authToken'),
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
