import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const AddComment = ({ isSubmitting, content, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input
      disabled={isSubmitting}
      onChange={onChange}
      placeholder="Add a comment..."
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
          createdAt
          user {
            username
          }
        }
      }
    `
  ),
  withState('content', 'setContent', ''),
  withState('isSubmitting', 'setIsSubmitting', false),
  withHandlers({
    onChange: ({ setContent }) => event => {
      setContent(event.target.value)
    },
    onSubmit: ({ content, commentsData, mutate, productId, setContent, setIsSubmitting }) => async event => {
      event.preventDefault()
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
    },
  })
)(AddComment)
