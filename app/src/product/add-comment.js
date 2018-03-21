import { authGql } from 'utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import React from 'react'
import { compose, getContext, withHandlers, withState } from 'recompose'

const AddComment = ({ isSubmitting, content, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      disabled={isSubmitting}
      onChange={onChange}
      placeholder="Add a comment..."
      required
      style={{ marginTop: '0.5rem', width: '100%' }}
      type="text"
      value={content}
    />
  </form>
)

export default compose(
  graphql(
    gql`
      mutation($comment: CommentInputType!) {
        addComment(comment: $comment) {
          id
          content
          upvotesCount
          createdAt
          user {
            username
          }
          upvotes(currentUser: true) {
            id
          }
        }
      }
    `
  ),
  withState('content', 'setContent', ''),
  withState('isSubmitting', 'setIsSubmitting', false),
  getContext({
    checkLoginModal: PropTypes.func,
  }),
  withHandlers({
    onChange: ({ setContent }) => event => {
      setContent(event.target.value)
    },
    onSubmit: ({ content, commentsData, checkLoginModal, mutate, productId, setContent, setIsSubmitting }) => event =>
      authGql(async () => {
        event.preventDefault()
        if (checkLoginModal()) return
        setIsSubmitting(true)
        const comment = { content, productRef: String(productId) }
        const { data } = await mutate({ variables: { comment } })
        const newComment = data.addComment
        setContent('')
        setIsSubmitting(false)
        commentsData.updateQuery(previousCommentsData => ({
          ...previousCommentsData,
          comments: [...previousCommentsData.comments, newComment],
        }))
      }),
  })
)(AddComment)
