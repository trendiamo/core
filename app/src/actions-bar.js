import IconCart from './icon-cart'
import IconHeart from './icon-heart'
import IconHeartS from './icon-hearts'
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
    increment: ({ setLikesCount }) => () => setLikesCount(n => n + 1),
    decrement: ({ setLikesCount }) => () => setLikesCount(n => n - 1)
  }),
  withHandlers({
    onBuyClicked: ({ product }) => event => {
      addToCart(product.variant_id)
    },
    onHeartClicked: ({
      consumerId,
      decrement,
      increment,
      isLiked,
      likeId,
      openModal,
      product,
      setIsLiked,
      setLikeId
    }) => event => {
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
    }
  }),
  lifecycle({
    componentDidMount() {
      const { consumerId, product, setIsLiked, setLikeId, setLikesCount } = this.props
      fetchLikesCount(product.id).then(likesCount => setLikesCount(likesCount))
      if (!consumerId) return
      fetchLike(consumerId, product.id).then(response => {
        if (response.status !== 404) {
          setIsLiked(true)
          setLikeId(response.id)
        }
      })
    }
  }),
  withProps(({ likesCount, product }) => ({
    likesCountSet: likesCount !== undefined,
    productAvailable: product.available
  }))
)(ActionsBar)
