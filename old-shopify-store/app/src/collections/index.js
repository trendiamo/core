import Collections from '../../../../web-store/src/screens/collections/collections'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'
import { branch, compose, renderNothing, withProps } from 'recompose'

export default compose(
  graphql(
    gql`
      query {
        collections(first: 10, query: "published_status:'published'") {
          edges {
            node {
              handle
              title
              image {
                transformedSrc
              }
            }
          }
        }
      }
    `
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    taxons: data.collections.map(e => ({ permalink: e.handle, name: e.title, iconUrl: e.image.transformedSrc })),
  })),
)(Collections)
