import { addToCart } from './utils'
import { authGql } from 'utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { compose, getContext, withHandlers, withProps } from 'recompose'

const CardItemInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 10px;
  padding-left: 5%;
  padding-right: 5%;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  
  @media (max-width: 560px) {
    display: none;
  }
`

const CardItemLikes = styled.div`
  flex-basis: 80%;
  font-size: 1rem;
  margin-left: 0.5rem;
}
`

const CardItemAction = styled.a`
  color: white;
  margin-top: -7px;
  zoom: 1.5;
`

const Price = styled.span`
  font-size: 12px;
  margin-right: 0.5rem;
  vertical-align: middle;
  font-weight: 500;
`

const Heart = ({ isLiked }) =>
  isLiked ? (
    <div style={{ color: 'red' }}>
      <IconHeartS />
    </div>
  ) : (
    <IconHeart />
  )

const ActionsBar = ({ isLiked, likesCount, likesCountSet, onBuyClicked, onHeartClicked, price, productAvailable }) => (
  <CardItemInfo>
    <CardItemAction onClick={onHeartClicked}>
      <Heart isLiked={isLiked} />
    </CardItemAction>
    <CardItemLikes>{likesCountSet && `${likesCount} Likes`}</CardItemLikes>
    {productAvailable && (
      <CardItemAction onClick={onBuyClicked}>
        <Price>{price}</Price>
        <IconCart />
      </CardItemAction>
    )}
  </CardItemInfo>
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
    price: product.price_string,
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
