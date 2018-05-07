import { authGql } from 'utils'
import ContextMenu from 'components/context-menu'
import ContextMenuOps from './context-menu-ops'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withProps } from 'recompose'
import styled, { css } from 'styled-components'

const StyledLi = styled.li`
  padding: 0 5px;
  margin-bottom: 0.5rem;
  border-radius: 0 6px 6px 0;
  border-left-style: solid;
  border-left-width: 5px;
  border-left-color: transparent;
  ${({ pinned }) =>
    pinned &&
    css`
      border-left-color: #def;
    `};
  ${({ fromProductOwner }) =>
    fromProductOwner &&
    css`
      background-color: #def;
      border-left-color: #46c;
      padding: 5px;
    `};
`

const NameAndText = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledB = styled.b`
  margin-right: 0.3rem;
  ${({ fromProductOwner }) =>
    fromProductOwner &&
    css`
      color: #46c;
    `};
`

const StyledDiv = styled.div`
  font-size: 13px;
`

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
  <StyledLi fromProductOwner={fromProductOwner} pinned={pinned}>
    <NameAndText>
      <div>
        <StyledB fromProductOwner={fromProductOwner}>{username}</StyledB>
        <span>{content}</span>
      </div>
      <ContextMenu>
        <ContextMenuOps comment={comment} commentsData={commentsData} product={product} />
      </ContextMenu>
    </NameAndText>
    <StyledDiv>
      <span>{createdAt}</span>
      <span onClick={onUpvote}>{` ${upvoted ? '♥' : '♡'} ${upvotesCount}`}</span>
    </StyledDiv>
  </StyledLi>
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
