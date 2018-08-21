import { $ } from 'app/utils'
import { ApolloProvider } from 'react-apollo'
import authFactory from 'auth'
import AuthMenuItem from './auth-menu-item'
import clientBackend from '../graphql/client-backend'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const auth = authFactory()
  if (!auth.isLoggedIn) return

  ReactDOM.render(
    <ApolloProvider client={clientBackend}>
      <AuthMenuItem auth={auth} />
    </ApolloProvider>,
    $('.secondary-nav__item:first-child')
  )
  ReactDOM.render(
    <ApolloProvider client={clientBackend}>
      <AuthMenuItem auth={auth} mobile />
    </ApolloProvider>,
    $('.mobile-nav__item:last-child')
  )
}
