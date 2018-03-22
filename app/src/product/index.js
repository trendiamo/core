import { $ } from 'utils'
import { ApolloProvider } from 'react-apollo'
import AuthModalProvider from 'auth/auth-modal-provider'
import client from 'graphql/client'
import Product from './product'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const appElement = $('.comments')
  const productRef = String(JSON.parse($('#ProductJson-product-template').text).id)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthModalProvider appElement={appElement}>
        <Product productRef={productRef} />
      </AuthModalProvider>
    </ApolloProvider>,
    appElement
  )
}
