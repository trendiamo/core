import Empty from './empty'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withProps, withState } from 'recompose'

const Products = ({ collection }) => (
  <div
    className="container container--tiny"
    style={{
      borderRadius: '14px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.18)',
      marginBottom: '2rem',
      marginTop: '2rem',
      paddingBottom: '1rem',
      paddingTop: '1rem',
      position: 'relative',
      width: '90%',
    }}
  >
    {'YOUR PRODUCTS'}
    {collection.products ? (
      <ul>{collection.products.edges.map(edge => <li key={edge.node.handle}>{edge.node.handle}</li>)}</ul>
    ) : (
      <Empty />
    )}
  </div>
)

const collection = gql`
  query($shopifyId: ID!) {
    collection(id: $shopifyId) {
      id
      handle
      products(first: 10) {
        edges {
          node {
            id
            handle
            images(first: 1) {
              edges {
                node {
                  id
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  }
`

export default compose(
  graphql(collection, {
    options: ({ brand }) => ({
      variables: { shopifyId: `gid://shopify/Collection/` + brand.shopifyCollectionId },
    }),
  }),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    collection: data.collection,
  })),
  withState('errors', 'setErrors', ({ collection }) => console.log(collection.products))
)(Products)
