import React from 'react'
import { compose, withProps, withState, lifecycle, branch, renderNothing } from 'recompose'
import gql from 'graphql-tag'
// import graphql from 'graphql'
import { graphql, withApollo } from 'react-apollo'
import { Admin, Resource } from 'react-admin'
import { ExpositionsList } from './expositions'

const App = ({ data, dataProvider, ExpositionsList }) => (
  <Admin dataProvider={dataProvider}>
    <Resource name="expositions" list={ExpositionsList} />
  </Admin>
)
export default compose(
  // withApollo,
    // (query),
    // branch(({ data }) => data && (data.loading || data.error), renderNothing),
      // .then(response => console.log(response) || setData(response), () => console.log('failed')),
    withProps(({ dataProvider }) => ({
      allExpositions: dataProvider => myBuildQuery('GET_LIST', 'expositions'),
  })),
  lifecycle({
    componentDidMount() {
      const { allExpositions } = this.props
      console.log(allExpositions)
    }
  }),
)(App)
