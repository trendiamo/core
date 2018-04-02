import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ProductCard from './product-card'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import styled, { css } from 'styled-components'

const StyledDiv = styled.div`
  ${({ viewType }) =>
    viewType === 'grid' &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;

      @media (min-width: 920px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `};
`

const StyledSelect = styled.select`
  margin: 0 auto;
  display: block;
`

const Products = ({ data, products, onViewTypeChange, viewType }) => (
  <React.Fragment>
    <StyledSelect onChange={onViewTypeChange} value={viewType}>
      <option value="grid">{'Grid'}</option>
      <option value="list">{'List'}</option>
    </StyledSelect>
    <StyledDiv viewType={viewType}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} productsData={data} viewType={viewType} />
      ))}
    </StyledDiv>
  </React.Fragment>
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
  withState('viewType', 'setViewType', 'grid'),
  withProps(({ data, shopifyProducts }) => ({
    products: data.products.map(e => ({ ...shopifyProducts.find(x => String(x.id) === e.productRef), ...e })),
  })),
  withHandlers({
    onViewTypeChange: ({ setViewType }) => event => setViewType(event.target.value),
  })
)(Products)
