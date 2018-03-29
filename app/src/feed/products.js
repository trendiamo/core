import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ProductCard from './product-card'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'
import styled, { css } from 'styled-components'

const StyledDiv = styled.div`
  ${({ type }) =>
    type === 'grid' &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;

      @media (min-width: 920px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `};
`

const Products = ({ data, products }) => (
  <StyledDiv type="grid">
    {products.map(product => <ProductCard key={product.id} product={product} productsData={data} />)}
  </StyledDiv>
)

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
)(Products)
