import AppContext from 'app/app-context'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import withConsumerProps from 'ext/recompose/with-consumer-props'
import { branch, compose, lifecycle, renderNothing, withProps } from 'recompose'
import { Container, Footer, MainContent, Topbar } from 'shared/shell'

const H1 = styled.h1`
  text-align: center;
`

const Taxon = ({ taxon }) => (
  <Link to={`/collections/${taxon.permalink}`}>
    <img src={`${taxon.iconUrl}`} />
    <p>{taxon.name}</p>
  </Link>
)

const Collections = ({ taxons }) => (
  <React.Fragment>
    <Topbar />
    <Container>
      <H1>{'Collections'}</H1>
      <MainContent fullWidth>{taxons.map(taxon => <Taxon key={taxon.permalink} taxon={taxon} />)}</MainContent>
      <Footer main />
    </Container>
  </React.Fragment>
)

// TODO: show these in 3 or 2 columns. show image, link to collection, have nice shadow.

export default compose(
  graphql(
    gql`
      query {
        taxons {
          permalink
          name
          iconUrl
        }
      }
    `
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    taxons: data.taxons,
  })),
  withConsumerProps(AppContext.Consumer, ({ setTaxons }) => ({ setTaxons })),
  lifecycle({
    componentWillMount() {
      const { setTaxons, taxons } = this.props
      setTaxons(taxons)
    },
  })
)(Collections)
