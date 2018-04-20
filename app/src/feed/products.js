import Cover from './cover'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import ProductCard from './product-card'
import React from 'react'
import ViewTypeSelector from './view-type-selector'
import { branch, compose, renderNothing, withProps, withState } from 'recompose'
import styled, { css } from 'styled-components'

const StyledDiv = styled.div`
  margin-top: 2rem;
  ${({ viewType }) =>
    viewType === 'list' ||
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;

      @media (min-width: 920px) {
        grid-template-columns: repeat(3, 1fr);
      }
    `};
`

const Products = ({ collection, data, isBrand, products, setViewType, viewType }) => (
  <React.Fragment>
    <Cover collection={collection} />
    <ViewTypeSelector onViewTypeChange={setViewType} showPeople={isBrand} viewType={viewType} />
    <StyledDiv viewType={viewType}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} productsData={data} viewType={viewType} />
      ))}
    </StyledDiv>
  </React.Fragment>
)

const filterProducts = ({ isBrand, products, shopifyProducts, viewType }) => {
  const filteredProducts = products.map(e => ({ ...shopifyProducts.find(x => String(x.id) === e.productRef), ...e }))
  if (!isBrand) return filteredProducts
  if (viewType === 'people') {
    return filteredProducts.filter(e => e.user)
  } else {
    return filteredProducts.filter(e => !e.user)
  }
}

export default compose(
  graphql(
    gql`
      query($handle: String!, $productRefs: [String]!) {
        products(productRefs: $productRefs) {
          id
          productRef
          likesCount
          likes(currentUser: true) {
            id
          }
          user {
            username
          }
        }
        collection(handle: $handle) {
          title
          description
          profilePicUrl
          coverPicUrl
        }
      }
    `,
    {
      options: ({ shopifyCollection, shopifyProducts }) => ({
        variables: { handle: shopifyCollection.handle, productRefs: shopifyProducts.map(e => String(e.id)) },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withState('viewType', 'setViewType', 'grid'),
  withProps(({ data, shopifyCollection }) => ({
    collection: { ...shopifyCollection, ...data.collection },
  })),
  withProps(({ collection }) => ({
    isBrand: collection.rules[0].column === 'vendor',
  })),
  withProps(({ data, isBrand, shopifyProducts, viewType }) => ({
    products: filterProducts({ isBrand, products: data.products, shopifyProducts, viewType }),
  }))
)(Products)
