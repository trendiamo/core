import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ProductCard from './product-card'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'

const ProductsGrid = ({ data, products }) =>
  products.map(product => <ProductCard key={product.id} product={product} productsData={data} />)

export default compose(
  graphql(
    gql`
      query($productRefs: [String]!) {
        products(productRefs: $productRefs) {
          id
          productRef
          likesCount
          likes(currentUser: true) {
            id
          }
        }
      }
    `,
    {
      options: ({ shopifyProducts }) => ({
        variables: { productRefs: shopifyProducts.map(e => String(e.id)) },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data, shopifyProducts }) => ({
    products: data.products.map(e => ({ ...shopifyProducts.find(x => String(x.id) === e.productRef), ...e })),
  }))
)(ProductsGrid)
