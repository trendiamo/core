import Cookies from 'js-cookie'
import { getMaxWidthForCompleteCard } from './utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import React from 'react'
import { addToCart, authGql, formatMoney } from 'utils'
import { compose, withHandlers, withProps, withState } from 'recompose'
import styled, { css } from 'styled-components'

window.Cookies = Cookies

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

  &:hover,
  &:focus {
    opacity: 1;
  }

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

const ActionsBar = ({ isLiked, likesCount, onBuyClicked, onHeartClicked, price, showAddToCart, viewType }) => (
  <CardItemInfo viewType={viewType}>
    <CardItemAction onClick={onHeartClicked}>
      <Heart isLiked={isLiked} />
      <CardItemLikes>{`${likesCount} Likes`}</CardItemLikes>
    </CardItemAction>
    {showAddToCart && (
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
      mutation($productId: String!, $remove: Boolean!) {
        toggleLike(productId: $productId, remove: $remove) {
          likesCount
          likes(currentUser: true) {
            id
          }
        }
      }
    `
  ),
  withState('isLiked', 'setIsLiked', ({ product }) => (Cookies.getJSON('likes') || {})[product.id] || false),
  withHandlers({
    setIsLiked: ({ product, setIsLiked }) => isLiked => {
      Cookies.set('likes', { ...Cookies.getJSON('likes'), [product.id]: isLiked })
      setIsLiked(isLiked)
    },
  }),
  withProps(({ isLiked, product, showAddToCart }) => ({
    isLiked: product.likes.length > 0 || isLiked,
    likesCount: product.likesCount,
    price: formatMoney(product.price),
    showAddToCart: showAddToCart === undefined ? product.available : showAddToCart,
  })),
  withHandlers({
    onBuyClicked: ({ product }) => () => {
      addToCart(product.variants[0].id)
    },
    onHeartClicked: ({ isLiked, mutate, product, onToggleLike, setIsLiked }) => () =>
      authGql(async () => {
        const { id: productId } = product
        const { data } = await mutate({ variables: { productId, remove: isLiked } })
        setIsLiked(!isLiked)
        onToggleLike(data)
      }),
  })
)(ActionsBar)
