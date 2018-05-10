import { ApolloProvider } from 'react-apollo'
import AuthModalProvider from 'auth/auth-modal-provider'
import client from 'graphql/client'
import Collection from './collection'
import React from 'react'
import ReactDOM from 'react-dom'
import { $, $$ } from 'utils'

export default () => {
  const appElement = $('#Collection')
  const shopifyProducts = $$('.product-info', info => JSON.parse(info.content.textContent))
  const shopifyCollection = JSON.parse($('.collection-info').content.textContent)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AuthModalProvider appElement={appElement}>
        <Collection appElement={appElement} shopifyCollection={shopifyCollection} shopifyProducts={shopifyProducts} />
      </AuthModalProvider>
    </ApolloProvider>,
    appElement
  )
}
