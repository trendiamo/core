import IconCart from 'icons/icon-cart'
import IconHeart from 'icons/icon-heart'
import IconHeartS from 'icons/icon-hearts'
import React from 'react'
import { addToCart, createLike, fetchLike, fetchLikesCount, removeLike } from './utils'
import { compose, lifecycle, withHandlers, withProps, withState } from 'recompose'

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
  withState('likesCount', 'setLikesCount', 0),
  withState('isLiked', 'setIsLiked', false),
  withState('likeId', 'setLikeId', null),
  withHandlers({
    decrement: ({ setLikesCount }) => () => setLikesCount(n => n - 1),
    increment: ({ setLikesCount }) => () => setLikesCount(n => n + 1),
  }),
  withHandlers({
    onBuyClicked: ({ product }) => () => {
      addToCart(product.variant_id)
    },
    onHeartClicked: ({
      metadata,
      decrement,
      increment,
      isLiked,
      likeId,
      openModal,
      product,
      setIsLiked,
      setLikeId,
    }) => () => {
      const { consumerId } = metadata
      if (!consumerId) {
        openModal()
        return
      }
      setIsLiked(!isLiked)
      if (isLiked) {
        removeLike(likeId)
        decrement()
      } else {
        createLike(consumerId, product.id).then(response => {
          if (response.ok) {
            setLikeId(response.id)
          }
        })
        increment()
      }
    },
  }),
  lifecycle({
    componentDidMount() {
      const { metadata, product, setIsLiked, setLikeId, setLikesCount } = this.props
      const { consumerId } = metadata
      fetchLikesCount(product.id).then(likesCount => setLikesCount(likesCount))
      if (!consumerId) return
      fetchLike(consumerId, product.id).then(response => {
        if (response.status !== 404) {
          setIsLiked(true)
          setLikeId(response.id)
        }
      })
    },
  }),
  withProps(({ likesCount, product }) => ({
    likesCountSet: likesCount !== undefined,
    productAvailable: product.available,
  }))
)(ActionsBar)
