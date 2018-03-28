import { ApolloProvider } from 'react-apollo'
import AuthModalProvider from 'auth/auth-modal-provider'
import client from 'graphql/client'
import ProductsGrid from './products-grid'
import React from 'react'
import ReactDOM from 'react-dom'
import { $, $$ } from 'utils'

export default () => {
  const appElement = $('#Collection')
  const shopifyProducts = $$('.product-info', info => JSON.parse(info.content.textContent))

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthModalProvider appElement={appElement}>
        <ProductsGrid shopifyProducts={shopifyProducts} />
      </AuthModalProvider>
    </ApolloProvider>,
    appElement
  )
}
