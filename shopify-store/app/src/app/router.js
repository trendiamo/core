import { $ } from './utils'
import Account from 'screens/account'
import authFactory from 'auth'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'

const AppRouter = ({ auth }) => (
  <Router>
    <Route exact path="/u/account" render={() => <Account auth={auth} />} />
  </Router>
)

export default () => {
  const target = $('.main')
  const auth = authFactory()

  ReactDOM.render(<AppRouter auth={auth} />, target)
}
