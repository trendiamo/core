import { $ } from './utils'
import Account from 'screens/account'
import { ApolloProvider } from 'react-apollo'
import authFactory from 'auth'
import CbpComplete from 'screens/brand-profile/fourth'
import CbpInfo from 'screens/brand-profile/first'
import CbpPreview from 'screens/brand-profile/second'
import CbpShipping from 'screens/brand-profile/third'
import client from './graphql'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

const AppRouter = ({ auth }) => (
  <Router>
    <ApolloProvider client={client}>
      <Route exact path="/u/account" render={() => <Account auth={auth} />} />
      <Route component={CbpInfo} exact path="/u/create-brand-profile/1" />
      <Route component={CbpPreview} exact path="/u/create-brand-profile/2" />
      <Route component={CbpShipping} exact path="/u/create-brand-profile/3" />
      <Route component={CbpComplete} exact path="/u/create-brand-profile/4" />
    </ApolloProvider>
  </Router>
)

export default () => {
  const target = $('.main')
  const auth = authFactory()

  ReactDOM.render(<AppRouter auth={auth} />, target)
}
