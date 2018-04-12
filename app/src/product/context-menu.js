import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import IconEllipsisV from 'icons/icon-ellipsis-v'
import PropTypes from 'prop-types'
import React from 'react'
import StyledPopper from 'components/styled-popper'
import { Arrow, Manager, Target } from 'react-popper'
import { authGql, getMetadata } from 'utils'
import { compose, getContext, withHandlers, withProps, withState } from 'recompose'

const sortPinned = commentId => (a, b) => {
  if (a.id === commentId && a.pinned) {
    return -1
  }
  if (a.id === commentId && b.pinned) {
    return 1
  }
  if (b.id === commentId && b.pinned) {
    return 1
  }
  if (b.id === commentId && a.pinned) {
    return -1
  }
}

const ContextMenu = ({ handleMenuClick, isOpen, currentUserIsProductOwner, onFlag, onPin, onRemove }) => (
  <Manager style={{ minWidth: '20px', position: 'relative' }}>
    <Target className="target" onClick={handleMenuClick}>
      <IconEllipsisV />
    </Target>
    {isOpen && (
      <StyledPopper gray placement="bottom">
        <ul>
          <li>
            <span onClick={onFlag}>{'Flag as inappropriate'}</span>
          </li>
          {currentUserIsProductOwner && (
            <React.Fragment>
              <li>
                <span onClick={onPin}>{'Toggle pinned'}</span>
              </li>
              <li>
                <span onClick={onRemove}>{'Remove'}</span>
              </li>
            </React.Fragment>
          )}
        </ul>
        <Arrow className="popper__arrow" />
      </StyledPopper>
    )}
  </Manager>
)

export default compose(
  withState('isOpen', 'setIsOpen', false),
  withHandlers({
    close: ({ setIsOpen }) => () => setIsOpen(false),
    open: ({ setIsOpen }) => () => setIsOpen(true),
    toggle: ({ isOpen, setIsOpen }) => () => setIsOpen(!isOpen),
  }),
  withHandlers({
    handleMenuClick: ({ toggle }) => event => {
      event.preventDefault()
      toggle()
    },
  }),
  graphql(
    gql`
      mutation($commentId: ID!) {
        flag(commentId: $commentId) {
          id
        }
      }
    `,
    { name: 'flag' }
  ),
  graphql(
    gql`
      mutation($commentId: ID!) {
        togglePinComment(commentId: $commentId) {
          pinned
        }
      }
    `,
    { name: 'togglePinComment' }
  ),
  graphql(
    gql`
      mutation($commentId: ID!) {
        removeComment(commentId: $commentId) {
          id
        }
      }
    `,
    { name: 'removeComment' }
  ),
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onFlag: ({ close, flag, comment, checkLoginModal }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const commentId = comment.id
        await flag({ variables: { commentId } })
        close()
      }),
    onPin: ({ commentsData, close, togglePinComment, comment, checkLoginModal }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const commentId = comment.id
        const { data } = await togglePinComment({ variables: { commentId } })
        close()
        commentsData.updateQuery(previousCommentsData => ({
          ...previousCommentsData,
          comments: previousCommentsData.comments
            .map(e => (e.id === commentId ? { ...e, ...data.togglePinComment } : e))
            .sort(sortPinned(commentId)),
        }))
      }),
    onRemove: ({ commentsData, close, removeComment, comment, checkLoginModal }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const commentId = comment.id
        await removeComment({ variables: { commentId } })
        close()
        commentsData.updateQuery(previousCommentsData => ({
          ...previousCommentsData,
          comments: previousCommentsData.comments.filter(e => e.id !== commentId),
        }))
      }),
  }),
  withProps(({ product }) => ({
    currentUserIsProductOwner: product.user.email === getMetadata().userEmail,
  }))
)(ContextMenu)
