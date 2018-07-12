import { ApolloProvider } from 'react-apollo'
import AppContext from './app-context'
import Collections from 'screens/collections'
import css from 'shared/style'
import graphqlClient from './graphql-client'
import Helmet from 'react-helmet'
import Home from 'screens/home'
import Legal from 'screens/legal'
import NoMatch from 'screens/no-match'
import Pdp from 'screens/pdp'
import Plp from 'screens/plp'
import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

const App = () => (
  <Router>
    <ApolloProvider client={graphqlClient}>
      <AppContext.Provider>
        <Helmet style={[{ cssText: css }]} />
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Collections} exact path="/collections" />
          <Route component={Plp} exact path="/collections/:slug" />
          <Route component={Pdp} path="/collections/:tslug/products/:slug" />
          <Route component={Legal} path="/legal/:id" />
          <Route component={NoMatch} />
        </Switch>
      </AppContext.Provider>
    </ApolloProvider>
  </Router>
)

export default App
