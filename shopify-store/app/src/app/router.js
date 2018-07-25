import { $ } from './utils'
import Account from 'screens/account'
import { ApolloProvider } from 'react-apollo'
import authFactory from 'auth'
import client from './graphql'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

const AppRouter = ({ auth }) => (
  <Router>
    <ApolloProvider client={client}>
      <Route exact path="/u/account" render={() => <Account auth={auth} />} />
    </ApolloProvider>
  </Router>
)

export default () => {
  const target = $('.main')
  const auth = authFactory()

  ReactDOM.render(<AppRouter auth={auth} />, target)
}
