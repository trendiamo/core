import { getMaxWidthForCompleteCard } from './utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import PropTypes from 'prop-types'
import React from 'react'
import { addToCart, authGql, formatMoney } from 'utils'
import { compose, getContext, withHandlers, withProps } from 'recompose'
import styled, { css } from 'styled-components'

const CardItemInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 8px;
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
  svg {
    zoom: 1.5;
  }
`

const Price = styled.span`
  font-size: 1rem;
  margin-right: 0.5rem;
  vertical-align: middle;
  font-weight: 500;
`

const HeartContainer = styled.span`
  vertical-align: middle;
  ${({ isLiked }) =>
    isLiked &&
    css`
      color: red;
    `};
`

const Heart = ({ isLiked }) => (
  <HeartContainer isLiked={isLiked}>{isLiked ? <IconHeartS /> : <IconHeart />}</HeartContainer>
)

const ActionsBar = ({
  isLiked,
  likesCount,
  likesCountSet,
  onBuyClicked,
  onHeartClicked,
  price,
  showAddToCart,
  viewType,
}) => (
  <CardItemInfo viewType={viewType}>
    <CardItemAction onClick={onHeartClicked}>
      <Heart isLiked={isLiked} />
      <CardItemLikes>{likesCountSet && `${likesCount} Likes`}</CardItemLikes>
    </CardItemAction>
    {showAddToCart && (
      <CardItemAction onClick={onBuyClicked}>
        <Price>{price}</Price>
        <IconCart />
      </CardItemAction>
    )}
  </CardItemInfo>
)

const likesCountFromJson = product => {
  switch (product.productRef) {
    case '600001904698':
      return 478
    case '600001839162':
      return 672
    default:
      return 0
  }
}

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
  withProps(({ product, showAddToCart }) => ({
    isLiked: product.likes.length > 0,
    likeId: product.likes.length > 0 && product.likes[0].id,
    likesCount: product.likesCount + likesCountFromJson(product),
    likesCountSet: product.likesCount !== undefined,
    price: formatMoney(product.price),
    showAddToCart: showAddToCart === undefined ? product.available : showAddToCart,
  })),
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onBuyClicked: ({ product }) => () => {
      addToCart(product.variants[0].id)
    },
    onHeartClicked: ({ checkLoginModal, mutate, product, onToggleLike }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const { id: productId } = product
        const { data } = await mutate({ variables: { productId: productId } })
        onToggleLike(data)
      }),
  })
)(ActionsBar)
