import { authGql } from 'auth/utils'
import Empty from './empty'
import gql from 'graphql-tag'
import Loader from 'shared/loader'
import Product from './product'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { graphql, withApollo } from 'react-apollo'

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

const ProductsList = ({ deleteAllProducts, deleteProduct, isLoading, products, productsCount }) => (
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

const deleteProduct = gql`
  mutation($input: [String]!) {
    deleteProducts(input: $input) {
      deletedProductsIds
    }
  }
`

export default compose(
  withApollo,
  graphql(Collection, {
    name: 'CollectionQuery',
    options: ({ brand }) => ({
      variables: { shopifyId: `${brand.shopifyCollectionId}` },
    }),
  }),
  branch(({ CollectionQuery }) => CollectionQuery && (CollectionQuery.loading || CollectionQuery.error), renderNothing),
  withProps(({ CollectionQuery }) => ({
    collection: CollectionQuery.shopifyCollection,
    pageInfo: CollectionQuery.shopifyCollection.products.pageInfo,
    products: CollectionQuery.shopifyCollection.products.edges,
    productsCount: CollectionQuery.shopifyCollection.productsCount,
  })),
  withState('isLoading', 'setIsLoading', false),
  graphql(deleteProduct, {
    options: ({ collection }) => ({
      update: (client, { data: { deleteProducts } }) => {
        const data = client.readQuery({
          query: Collection,
          variables: { shopifyId: collection.id },
        })
        const productIds = collection.products.edges.map(edge => edge.node.id)
        deleteProducts.deletedProductsIds.forEach(productId => {
          const index = productIds.indexOf(productId)
          data.shopifyCollection.products.edges.splice(index, 1)
          data.shopifyCollection.productsCount -= 1
        })
        client.writeQuery({
          data,
          query: Collection,
          variables: { shopifyId: collection.id },
        })
      },
    }),
  }),
  withHandlers({
    deleteAllProducts: ({ auth, products, mutate, setIsLoading }) => () => {
      if (!confirm(`Delete all the products?`)) {
        return
      }
      const productIds = products.map(edge => edge.node.id)
      authGql(auth, async () => {
        setIsLoading(true)
        await mutate({
          variables: { input: productIds },
        })
        setIsLoading(false)
      })
    },
    deleteProduct: ({ auth, mutate, setIsLoading }) => edge => {
      if (!confirm(`Delete ${edge.title}?`)) {
        return
      }
      authGql(auth, async () => {
        setIsLoading(true)
        await mutate({
          variables: { input: [edge.id] },
        })
        setIsLoading(false)
      })
    },
  })
)(ProductsList)
