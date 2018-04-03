import { $ } from 'utils'
import { ApolloProvider } from 'react-apollo'
import AuthModalProvider from 'auth/auth-modal-provider'
import client from 'graphql/client'
import Product from './product'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const appElement = $('.product')
  const product = JSON.parse($('#ProductJson-product-template').text)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthModalProvider appElement={appElement}>
        <Product productRef={String(product.id)} />
      </AuthModalProvider>
    </ApolloProvider>,
    appElement
  )
}
