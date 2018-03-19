import { $ } from 'utils'
import { ApolloProvider } from 'react-apollo'
import client from 'graphql/client'
import Comments from './comments'
import React from 'react'
import ReactDOM from 'react-dom'

export default () => {
  const product = JSON.parse($('#ProductJson-product-template').text)
  const container = $('.comments')

  ReactDOM.render(
    <ApolloProvider client={client}>
      <Comments productId={product.id} />
    </ApolloProvider>,
    container
  )
}
