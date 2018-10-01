import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import { Admin, GET_LIST, Resource } from 'react-admin'
import { ExpositionsList } from './expositions'
import buildOpenCrudProvider, { buildQuery } from 'ra-data-opencrud'
import Hello from './hello'
import Home from './home'
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
        <Resource list={ExpositionsList} name="Exposition" />
      </Admin>
    )}
  </div>
)

export default compose(
  withState('dataProvider', 'setDataProvider', null),
  lifecycle({
    componentDidMount() {
      const { setDataProvider } = this.props
      buildOpenCrudProvider({
        clientOptions: {
          uri: 'https://b550d10d.ngrok.io/graphql',
        },
      })
        .then(dataProvider => {
          setDataProvider({ dataProvider })
        })
        .catch(reason => console.log(reason))
    },
  })
)(App)
