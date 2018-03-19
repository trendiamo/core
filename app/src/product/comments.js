import AddComment from './add-comment'
import Comment from './comment'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'

const Comments = ({ comments, data, productId }) => (
  <div>
    <ul>{comments.map(comment => <Comment comment={comment} key={comment.id} />)}</ul>
    <AddComment commentsData={data} productId={productId} />
  </div>
)

export default compose(
  graphql(
    gql`
      query($productRef: String!) {
        comments(productRef: $productRef) {
          id
          content
          createdAt
          user {
            username
          }
        }
      }
    `,
    {
      options: ({ productId }) => ({
        variables: { productRef: String(productId) },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    comments: data.comments,
  }))
)(Comments)
