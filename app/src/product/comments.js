import AddComment from './add-comment'
import Comment from './comment'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'

const Comments = ({ comments, data, product }) => (
  <div>
    <ul>
      {comments.map(comment => <Comment comment={comment} commentsData={data} key={comment.id} product={product} />)}
    </ul>
    <AddComment commentsData={data} productId={product.id} />
  </div>
)

export default compose(
  graphql(
    gql`
      query($productId: ID!) {
        comments(productId: $productId) {
          id
          content
          pinned
          upvotesCount
          createdAt
          isFromProductOwner
          user {
            username
          }
          upvotes(currentUser: true) {
            id
          }
        }
      }
    `,
    {
      options: ({ product }) => ({
        variables: { productId: product.id },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    comments: data.comments,
  }))
)(Comments)
