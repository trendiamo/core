import { $ } from 'utils'
import Callout from './callout'
import Comments from './comments'
import ContextMenu from 'feed/context-menu'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Media from './media'
import Offers from './offers'
import Pictures from './pictures'
import React from 'react'
import ReactDOM from 'react-dom'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'

const Portal = ({ children, domNode }) => ReactDOM.createPortal(children, domNode)

const Product = ({ collection, profilePicUrl, product, onToggleLike }) => (
  <Portal domNode={$('.product')}>
    <div className="product-template__container page-width" itemScope itemType="http://schema.org/Product">
      <meta content={product.title} itemProp="name" />
      <meta content={window.location.href} itemProp="url" />
      <meta content={product.featured_image} itemProp="image" />
      <div className="grid">
        <div className="grid__item medium-up--one-half">
          <div className="product-single">
            <div className="product-header">
              <div className="product-header-left">
                <img className="product-influencer__header-m__profilepic" src={profilePicUrl} />
                <div className="product-header-info">
                  <div className="product-influencer__header-m__heading">{product.title}</div>
                  <div className="product-header-vendor">{product.vendor}</div>
                </div>
              </div>
              <div className="context-menu">
                <ContextMenu product={product} viewType="list" />
              </div>
            </div>
            <Pictures onToggleLike={onToggleLike} product={product} />
          </div>
        </div>
        <div className="grid__item medium-up--one-half">
          <div style={{ margin: '0 1.5rem' }}>
            <div className="product-single__meta">
              <h1 className="product-single__title" itemProp="name">
                {product.title}
              </h1>
              <p className="product-single__vendor" itemProp="brand">
                {product.vendor}
              </p>
              <Offers product={product} />
              {/* eslint-disable react/no-danger */}
              <div
                className="product-single__description rte"
                dangerouslySetInnerHTML={{ __html: product.description }}
                itemProp="description"
              />
              {/* eslint-enable react/no-danger */}
              <Media product={product} />
              <div className="callout">
                <Callout collection={collection} />
              </div>
              <div className="comments">
                <Comments product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Portal>
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
            profilePicUrl
          }
          mediaItems
        }
        collection(handle: $handle) {
          handle
          title
          profilePicUrl
        }
      }
    `,
    {
      options: ({ collection, shopifyProduct }) => ({
        variables: { handle: collection.handle, productRefs: [String(shopifyProduct.id)] },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data, shopifyProduct }) => ({
    collection: data.collection,
    product: { ...shopifyProduct, ...data.products[0] },
  })),
  withProps(({ collection, product }) => ({
    profilePicUrl: (product.user || {}).profilePicUrl || collection.profilePicUrl,
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
