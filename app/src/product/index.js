import { $ } from 'utils'
import { ApolloProvider } from 'react-apollo'
import AuthModalProvider from 'auth/auth-modal-provider'
import client from 'graphql/client'
import Comments from './comments'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const appElement = $('.comments')
  const product = JSON.parse($('#ProductJson-product-template').text)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthModalProvider appElement={appElement}>
        <Comments productId={product.id} />
      </AuthModalProvider>
    </ApolloProvider>,
    appElement
  )
}
