import ContextMenu from './context-menu'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withProps } from 'recompose'

const Comment = ({ content, createdAt, onFlag, onUpvote, upvoted, upvotesCount, username }) => (
  <li>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <b style={{ marginRight: '0.3rem' }}>{username}</b>
        <span>{content}</span>
      </div>
      <ContextMenu onFlag={onFlag} />
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
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onFlag: ({ flag, comment, checkLoginModal }) => close => async () => {
      if (checkLoginModal()) return
      const commentId = comment.id
      await flag({ variables: { commentId } })
      close()
    },
    onUpvote: ({ toggleUpvote, comment, commentsData, checkLoginModal }) => async () => {
      if (checkLoginModal()) return
      const commentId = comment.id
      const { data } = await toggleUpvote({ variables: { commentId } })
      commentsData.updateQuery(previousCommentsData => ({
        ...previousCommentsData,
        comments: previousCommentsData.comments.map(e => (e.id === commentId ? { ...e, ...data.toggleUpvote } : e)),
      }))
    },
  }),
  withProps(({ comment }) => ({
    content: comment.content,
    createdAt: moment(comment.createdAt).fromNow(),
    upvoted: comment.upvotes.length > 0,
    upvotesCount: comment.upvotesCount,
    username: comment.user.username,
  }))
)(Comment)
