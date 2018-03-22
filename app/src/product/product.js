import Comments from './comments'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'

const Product = ({ product }) => <Comments product={product} />

export default compose(
  graphql(
    gql`
      query($productRefs: [String]!) {
        products(productRefs: $productRefs) {
          id
          user {
            email
          }
        }
      }
    `,
    {
      options: ({ productRef }) => ({
        variables: { productRefs: [productRef] },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    product: data.products[0],
  }))
)(Product)
