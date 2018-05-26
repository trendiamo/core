import { $ } from 'utils'
import Callout from './callout'
import Comments from './comments'
import ContextMenu from 'components/context-menu'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Media from './media'
import Offers from './offers'
import Pictures from './pictures'
import React from 'react'
import ReactDOM from 'react-dom'
import ShareProduct from 'feed/share-product'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'

const Portal = ({ children, domNode }) => ReactDOM.createPortal(children, domNode)

const StyledContextMenu = styled(ContextMenu)`
  margin-right: 0.5rem;
`

const Product = ({ collection, profilePicUrl, product, onToggleLike }) => (
  <Portal domNode={$('.product')}>
    <div className="product-template__container page-width" itemScope itemType="http://schema.org/Product">
      <meta content={product.title} itemProp="name" />
      <meta content={window.location.href} itemProp="url" />
      <meta content={product.featured_image} itemProp="image" />
      <div className="grid">
        <div id="stage-m" className="grid__item medium-up--one-half">
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
                <StyledContextMenu product={product}>
                  <ul>
                    <ShareProduct product={product} />
                  </ul>
                </StyledContextMenu>
              </div>
            </div>
            <Pictures onToggleLike={onToggleLike} product={product} />
            <div class="side-bar-section-border-m"></div>
          </div>
        </div>
        <div id="side-bar" className="grid__item medium-up--one-half">
          <div style={{ margin: '0 2.5rem' }}>
            <div className="product-single__meta">
              <div id="product-header-desktop" className="product-header">
                <div className="product-header-left">
                  <img className="product-influencer__header-m__profilepic" src={profilePicUrl} />
                  <div className="product-header-info">
                    <div className="product-influencer__header-m__heading">{product.title}</div>
                    <div className="product-header-vendor">{product.vendor}</div>
                  </div>
                </div>
                <div className="context-menu">
                  <StyledContextMenu product={product}>
                    <ul>
                      <ShareProduct product={product} />
                    </ul>
                  </StyledContextMenu>
                </div>
                <div class="side-bar-section-border"></div>
              </div>
              <h1 className="product-single__title" itemProp="name">
                {product.title}
              </h1>
              <p className="product-single__vendor" itemProp="brand">
                {product.vendor}
              </p>
              <div
                className="product-single__description rte"
                dangerouslySetInnerHTML={{ __html: product.description+'<div class="side-bar-section-border"></div>' }}
                itemProp="description"
              ></div>
              {/* eslint-disable react/no-danger */}
              <Offers product={product} />
              {/* eslint-enable react/no-danger */}
              <div className="comments">
                <Comments product={product} />
                <div class="side-bar-section-border-top"></div>
                <div class="side-bar-section-border"></div>
              </div>
              <div className="product-footer">
                <ul className="product-footer-list">
                  <li className="product-footer-list-item">Terms & Conditions</li>
                  <li className="product-footer-list-item">Imprint</li>
                  <li className="product-footer-list-item">Privacy & Cookies</li>
                  <li className="product-footer-list-item">Contact Us</li>
                </ul>
                <div className="product-footer-copyright">
                  © 2018 store.nondimension.com - All Rights Reserved
                </div>
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
          productRef
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
