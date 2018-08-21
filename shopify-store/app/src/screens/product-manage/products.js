import { branch, compose, renderNothing, withProps, withState } from 'recompose'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React from 'react'

const Products = () => (
  <div
    className="container container--tiny"
    style={{
      borderRadius: '14px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.18)',
      marginBottom: '2rem',
      marginTop: '2rem',
      paddingBottom: '1rem',
      paddingTop: '1rem',
      position: 'relative',
      width: '90%',
    }}
  >
    {'YOUR PRODUCTS'}
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '20%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '35%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '80%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid rgb(200, 200, 200)',
        borderRadius: '6px',
        bottom: '-10%',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.18) 0px 4px 16px',
        color: 'rgb(200, 200, 200)',
        fontWeight: 'regular',
        letterSpacing: '1px',
        padding: '1%',
        position: 'absolute',
        right: '-3%',
        transform: 'rotate(-20deg)',
      }}
    >
      {'Empty'}
    </div>
  </div>
)

const collection = gql`
  query {
    collection(id: "gid://shopify/Collection/71688585273") {
      id
      handle
    }
  }
`

export default compose(
  graphql(me, { options: { fetchPolicy: 'network-only' } }),
  graphql(collection, { options: { fetchPolicy: 'network-only' } }),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    collection: data.collection,
  })),
  withState('errors', 'setErrors', ({ collection }) => console.log(collection))
)(Products)
