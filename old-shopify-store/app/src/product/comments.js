import AddComment from './add-comment'
import Comment from './comment'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'

const Ul = styled.ul`
  margin: 0 -10px;
`

const H2 = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: none;
  letter-spacing: initial;
`

const Comments = ({ comments, data, product }) => (
  <React.Fragment>
    <H2>{'Comments'}</H2>
    <Ul>
      {comments.map(comment => <Comment comment={comment} commentsData={data} key={comment.id} product={product} />)}
    </Ul>
    <AddComment commentsData={data} productId={product.id} />
  </React.Fragment>
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
