import { addToCart } from './utils'
import { authGql } from 'utils'
import { getMaxWidthForCompleteCard } from './utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withProps } from 'recompose'
import styled, { css } from 'styled-components'

const CardItemInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;

  @media (max-width: ${({ viewType }) => getMaxWidthForCompleteCard(viewType)}px) {
    display: none;
  }
`

const CardItemLikes = styled.span`
  font-size: 1rem;
  margin-left: 0.5rem;
}
`

const CardItemAction = styled.a`
  color: white;
`

const Price = styled.span`
  font-size: 12px;
  margin-right: 0.5rem;
  vertical-align: middle;
  font-weight: 500;
`

const HeartContainer = styled.span`
  zoom: 1.5;
  vertical-align: middle;
  ${({ isLiked }) =>
    isLiked &&
    css`
      color: red;
    `};
`

const Heart = ({ isLiked }) => <HeartContainer>{isLiked ? <IconHeartS /> : <IconHeart />}</HeartContainer>

const ActionsBar = ({
  isLiked,
  likesCount,
  likesCountSet,
  onBuyClicked,
  onHeartClicked,
  price,
  productAvailable,
  viewType,
}) => (
  <CardItemInfo viewType={viewType}>
    <CardItemAction>
      <Heart isLiked={isLiked} onClick={onHeartClicked} />
      <CardItemLikes>{likesCountSet && `${likesCount} Likes`}</CardItemLikes>
    </CardItemAction>
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
