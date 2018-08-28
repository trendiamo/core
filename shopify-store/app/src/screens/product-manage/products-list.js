import { authGql } from 'auth/utils'
import Empty from './empty'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Product from './product'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'

const PAGE_SIZE = 10

const ProductsDiv = styled.div`
  border-radius: 14px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.18) 0px 4px 16px;
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 2rem;
  position: relative;
  width: 90%;
`
const ProductsDivHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const ProductsDivHeadersProducts = styled.h6`
  flex: 1;
  margin: 0;
  text-align: left;
`
const ProductsDivHeadersDeleteAll = styled.h6`
  flex: 1;
  margin: 0;
  text-align: right;
  cursor: pointer;
  color: #fd898a;
`
const Ul = styled.ul`
  list-style: none;
  margin: 0;
`

const ProductsDivPageNav = styled.div`
  display: flex;
  justify-content: center;
`

const ProductsDivPageNavNext = styled.h6`
  flex: 1;
  cursor: pointer;
  text-align: ${({ pageInfo }) => (pageInfo.hasPreviousPage && pageInfo.hasNextPage ? `left` : `center`)};
  margin: 1rem;
`

const ProductsDivPageNavPrevious = styled.h6`
  flex: 1;
  cursor: pointer;
  text-align: ${({ pageInfo }) => (pageInfo.hasPreviousPage && pageInfo.hasNextPage ? `right` : `center`)};
  margin: 1rem;
`

const ProductsList = ({
  deleteAllProducts,
  deleteProduct,
  nextPage,
  pageInfo,
  previousPage,
  products,
  productsCount,
}) => (
  <ProductsDiv className="container container--small">
    <ProductsDivHeaders>
      <ProductsDivHeadersProducts>{`YOUR PRODUCTS (${productsCount})`}</ProductsDivHeadersProducts>
      {productsCount > 0 && (
        <ProductsDivHeadersDeleteAll onClick={deleteAllProducts}>{'Delete all'}</ProductsDivHeadersDeleteAll>
      )}
    </ProductsDivHeaders>
    {productsCount === 0 ? (
      <Empty />
    ) : (
      <Ul>
        {products.map(product => (
          <Product deleteProduct={deleteProduct} edge={product.node} key={product.node.handle} />
        ))}
      </Ul>
    )}
    <ProductsDivPageNav>
      {pageInfo.hasPreviousPage && (
        <ProductsDivPageNavPrevious onClick={previousPage} pageInfo={pageInfo}>
          {'Previous Page'}
        </ProductsDivPageNavPrevious>
      )}
      {pageInfo.hasNextPage && (
        <ProductsDivPageNavNext onClick={nextPage} pageInfo={pageInfo}>
          {'Next Page'}
        </ProductsDivPageNavNext>
      )}
    </ProductsDivPageNav>
  </ProductsDiv>
)

const Collection = gql`
  query($shopifyId: ID!, $first: Int, $last: Int, $after: String, $before: String) {
    collection(id: $shopifyId) {
      id
      handle
      productsCount
      products(first: $first, after: $after, before: $before, last: $last) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            handle
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  inventoryQuantity
                }
              }
            }
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

const CollectionProductIds = gql`
  query($shopifyId: ID!, $first: Int!) {
    collection(id: $shopifyId) {
      id
      products(first: $first) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

const deleteProduct = gql`
  mutation($input: ProductDeleteInput!) {
    productDelete(input: $input) {
      userErrors {
        field
        message
      }
      deletedProductId
      shop {
        id
      }
    }
  }
`

export default compose(
  graphql(Collection, {
    name: 'CollectionQuery',
    options: ({ brand }) => ({
      variables: { first: PAGE_SIZE, shopifyId: `gid://shopify/Collection/${brand.shopifyCollectionId}` },
    }),
  }),
  branch(({ CollectionQuery }) => CollectionQuery && (CollectionQuery.loading || CollectionQuery.error), renderNothing),
  withProps(({ CollectionQuery }) => ({
    collection: CollectionQuery.collection,
    pageInfo: CollectionQuery.collection.products.pageInfo,
    products: CollectionQuery.collection.products.edges,
    productsCount: CollectionQuery.collection.productsCount,
  })),
  graphql(CollectionProductIds, {
    name: 'CollectionProductIdsQuery',
    options: ({ collection, productsCount }) => ({
      variables: { first: productsCount, shopifyId: collection.id },
    }),
  }),
  graphql(deleteProduct),
  withHandlers({
    deleteAllProducts: ({ auth, products, CollectionQuery, CollectionProductIdsQuery, mutate }) => () => {
      const productIds = CollectionProductIdsQuery.collection.products.edges.map(edge => edge.node.id)
      productIds.forEach(productId => {
        authGql(auth, async () => {
          await mutate({
            variables: { input: { id: productId } },
          })
        })
      })
      CollectionQuery.refetch({ after: products[0].cursor, before: undefined, first: PAGE_SIZE, last: undefined })
    },
    deleteProduct: ({ auth, collection, mutate }) => edge => {
      authGql(auth, async () => {
        await mutate({
          refetchQueries: [
            {
              query: Collection,
              variables: { first: PAGE_SIZE, shopifyId: collection.id },
            },
          ],
          variables: { input: { id: edge.id } },
        })
      })
    },
    nextPage: ({ CollectionQuery, products }) => () => {
      CollectionQuery.refetch({
        after: products[products.length - 1].cursor,
        before: undefined,
        first: PAGE_SIZE,
        last: undefined,
      })
    },
    previousPage: ({ CollectionQuery, products }) => () => {
      CollectionQuery.refetch({ after: undefined, before: products[0].cursor, first: undefined, last: PAGE_SIZE })
    },
  })
)(ProductsList)
