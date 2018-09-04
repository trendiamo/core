import { authGql } from 'auth/utils'
import Empty from './empty'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Loader from 'shared/loader'
import Product from './product'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps, withState } from 'recompose'

const PAGE_SIZE = 10

const ProductsDiv = styled.div`
  border-radius: 14px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
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
  isLoading,
  nextPage,
  pageInfo,
  previousPage,
  products,
  productsCount,
}) => (
  <ProductsDiv className="container container--small">
    <Loader isLoading={isLoading} />
    <ProductsDivHeaders>
      <ProductsDivHeadersProducts>{`Your Products (${productsCount})`}</ProductsDivHeadersProducts>
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
  query($shopifyId: String!, $first: Int, $last: Int, $after: String, $before: String) {
    shopifyCollection(shopifyId: $shopifyId) {
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
            title
            variants(first: 20) {
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
  query($shopifyId: String!, $first: Int!) {
    shopifyCollection(shopifyId: $shopifyId) {
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
  mutation($input: String!) {
    deleteProducts(input: $input) {
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
      variables: { first: PAGE_SIZE, shopifyId: `${brand.shopifyCollectionId}` },
    }),
  }),
  branch(({ CollectionQuery }) => CollectionQuery && (CollectionQuery.loading || CollectionQuery.error), renderNothing),
  withProps(({ CollectionQuery }) => ({
    collection: CollectionQuery.shopifyCollection,
    pageInfo: CollectionQuery.shopifyCollection.products.pageInfo,
    products: CollectionQuery.shopifyCollection.products.edges,
    productsCount: CollectionQuery.shopifyCollection.productsCount,
  })),
  graphql(CollectionProductIds, {
    name: 'CollectionProductIdsQuery',
    options: ({ collection, productsCount }) => ({
      variables: { first: productsCount, shopifyId: `${collection.id}` },
    }),
  }),
  withState('isLoading', 'setIsLoading', false),
  graphql(deleteProduct),
  withHandlers({
    deleteAllProducts: ({
      auth,
      CollectionQuery,
      CollectionProductIdsQuery,
      mutate,
      productsCount,
      setIsLoading,
    }) => () => {
      if (!confirm(`Delete all the products?`)) {
        return
      }
      const productIds = CollectionProductIdsQuery.collection.products.edges.map(edge => edge.node.id)
      setIsLoading(true)
      let i = 1
      productIds.forEach(productId => {
        authGql(auth, async () => {
          await mutate({
            variables: { input: { id: productId } },
          })
          i++
          if (i === productsCount) {
            CollectionQuery.refetch({ after: undefined, before: undefined, first: PAGE_SIZE, last: undefined })
            setIsLoading(false)
          }
        })
      })
    },
    deleteProduct: ({ auth, collection, mutate, setIsLoading }) => edge => {
      if (!confirm(`Delete ${edge.title}?`)) {
        return
      }
      authGql(auth, async () => {
        setIsLoading(true)
        const { data } = await mutate({
          refetchQueries: [
            {
              query: Collection,
              variables: { awaitRefetchQueries: true, first: PAGE_SIZE, shopifyId: collection.id },
            },
          ],
          variables: { input: { id: edge.id } },
        })
        setIsLoading(data.loading)
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
  }),
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, 0)
    },
  })
)(ProductsList)
