import { addToCart } from './utils'
import { authGql } from 'utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withProps } from 'recompose'

const ActionsBar = ({ isLiked, likesCount, likesCountSet, onBuyClicked, onHeartClicked, productAvailable }) => (
  <div className="card-item-info">
    <div className="card-item-likes">{likesCountSet && `${likesCount} Likes`}</div>
    <a className="card-item-action like" onClick={onHeartClicked} style={{ color: isLiked ? 'red' : 'white' }}>
      {isLiked ? <IconHeartS /> : <IconHeart />}
    </a>
    {productAvailable && (
      <a className="card-item-action buy" onClick={onBuyClicked}>
        <IconCart />
      </a>
    )}
  </div>
)

export default compose(
  graphql(
    gql`
      mutation($productId: String!) {
        toggleLike(productId: $productId) {
          likesCount
          likes(currentUser: true) {
            id
          }
        }
      }
    `
  ),
  withProps(({ product }) => ({
    isLiked: product.likes.length > 0,
    likeId: product.likes.length > 0 && product.likes[0].id,
    likesCount: product.likesCount,
    likesCountSet: product.likesCount !== undefined,
    productAvailable: product.available,
  })),
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onBuyClicked: ({ product }) => () => {
      addToCart(product.variant_id)
    },
    onHeartClicked: ({ checkLoginModal, mutate, product, productsData }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const { id: productId } = product
        const { data } = await mutate({ variables: { productId: productId } })
        productsData.updateQuery(previousProductsData => ({
          ...previousProductsData,
          products: previousProductsData.products.map(e => (e.id === productId ? { ...e, ...data.toggleLike } : e)),
        }))
      }),
  })
)(ActionsBar)
