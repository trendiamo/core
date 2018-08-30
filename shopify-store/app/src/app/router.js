import { $ } from './utils'
import Account from 'screens/account'
import { ApolloProvider } from 'react-apollo'
import authFactory from 'auth'
import CbpComplete from 'screens/brand-profile/fourth'
import CbpInfo from 'screens/brand-profile/first'
import CbpPreview from 'screens/brand-profile/second'
import CbpShipping from 'screens/brand-profile/third'
import clientBackend from 'graphql/client-backend'
import Password from 'screens/password'
import ProductManage from 'screens/product-manage'
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router'
import { compose, lifecycle } from 'recompose'
import { Route, BrowserRouter as Router } from 'react-router-dom'

// see app/utils navTo method.
const ExposeNav = compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      const { history } = this.props
      window.__reactRouterHistory = history
    },
    componentWillUnmount() {
      delete window.__reactRouterHistory
    },
  })
)(() => null)

const AppRouter = ({ auth }) => (
  <Router>
    <ApolloProvider client={clientBackend}>
      <ExposeNav />
      <Route exact path="/u/account" render={() => <Account auth={auth} />} />
      <Route exact path="/u/password" render={() => <Password auth={auth} />} />
      <Route exact path="/u/create-brand-profile/1" render={() => <CbpInfo auth={auth} />} />
      <Route exact path="/u/create-brand-profile/2" render={() => <CbpPreview auth={auth} />} />
      <Route exact path="/u/create-brand-profile/3" render={() => <CbpShipping auth={auth} />} />
      <Route exact path="/u/create-brand-profile/4" render={() => <CbpComplete auth={auth} />} />
      <Route exact path="/u/manage-products" render={() => <ProductManage auth={auth} />} />
    </ApolloProvider>
  </Router>
)

export default () => {
  const target = $('.main')
  const auth = authFactory()

  ReactDOM.render(<AppRouter auth={auth} />, target)
}
