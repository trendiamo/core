import { $ } from 'utils'
import ActionsBar from 'feed/actions-bar'
import Callout from './callout'
import Comments from './comments'
import ContextMenu from 'feed/context-menu'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import ReactDOM from 'react-dom'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'

const Portal = ({ children, domNode }) => ReactDOM.createPortal(children, domNode)

const Product = ({ collection, product, onToggleLike }) => (
  <React.Fragment>
    <Portal domNode={$('.context-menu')}>
      <ContextMenu product={product} viewType="list" />
    </Portal>
    <Portal domNode={$('.actions-bar')}>
      <ActionsBar onToggleLike={onToggleLike} product={product} viewType="list" />
    </Portal>
    <Portal domNode={$('.callout')}>
      <Callout collection={collection} />
    </Portal>
    <Portal domNode={$('.comments')}>
      <Comments product={product} />
    </Portal>
  </React.Fragment>
)

export default compose(
  graphql(
    gql`
      query($handle: String!, $productRefs: [String]!) {
        products(productRefs: $productRefs) {
          id
          likesCount
          likes(currentUser: true) {
            id
          }
          user {
            email
          }
        }
        collection(handle: $handle) {
          handle
          title
          profile_pic_url
        }
      }
    `,
    {
      options: ({ collection, productRef }) => ({
        variables: { handle: collection.handle, productRefs: [productRef] },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    collection: data.collection,
    product: data.products[0],
  })),
  withHandlers({
    onToggleLike: ({ data, product }) => newData => {
      if (!data) return
      const { id: productId } = product
      data.updateQuery(previousData => ({
        ...previousData,
        products: previousData.products.map(e => (e.id === productId ? { ...e, ...newData.toggleLike } : e)),
      }))
    },
  })
)(Product)
