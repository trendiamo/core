import { authGql } from 'utils'
import ContextMenu from './context-menu'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withProps } from 'recompose'

const Comment = ({
  comment,
  commentsData,
  pinned,
  product,
  content,
  createdAt,
  fromProductOwner,
  onUpvote,
  upvoted,
  upvotesCount,
  username,
}) => (
  <li>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '0.2rem',
        ...(fromProductOwner ? { backgroundColor: '#def' } : {}),
        ...(pinned ? { borderLeftColor: '#bcd', borderLeftStyle: 'solid', borderLeftWidth: '2px' } : {}),
      }}
    >
      <div>
        <b style={{ marginRight: '0.3rem', ...(fromProductOwner ? { color: '#46c' } : {}) }}>{username}</b>
        <span>{content}</span>
      </div>
      <ContextMenu comment={comment} commentsData={commentsData} product={product} />
    </div>
    <div>
      <span>{createdAt}</span>
      <span onClick={onUpvote}>{` ${upvoted ? '▲' : '▵'} ${upvotesCount}`}</span>
    </div>
  </li>
)

export default compose(
  graphql(
    gql`
      mutation($commentId: ID!) {
        toggleUpvote(commentId: $commentId) {
          upvotesCount
          upvotes(currentUser: true) {
            id
          }
        }
      }
    `,
    { name: 'toggleUpvote' }
  ),
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onUpvote: ({ toggleUpvote, comment, commentsData, checkLoginModal }) => () =>
      authGql(async () => {
        if (checkLoginModal()) return
        const commentId = comment.id
        const { data } = await toggleUpvote({ variables: { commentId } })
        commentsData.updateQuery(previousCommentsData => ({
          ...previousCommentsData,
          comments: previousCommentsData.comments.map(e => (e.id === commentId ? { ...e, ...data.toggleUpvote } : e)),
        }))
      }),
  }),
  withProps(({ comment }) => ({
    content: comment.content,
    createdAt: moment(comment.createdAt).fromNow(),
    fromProductOwner: comment.isFromProductOwner,
    pinned: comment.pinned,
    upvoted: comment.upvotes.length > 0,
    upvotesCount: comment.upvotesCount,
    username: comment.user.username,
  }))
)(Comment)
