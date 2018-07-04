import AppContext from 'app/app-context'
import Breadcrumbs from 'shared/breadcrumbs'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Hr from 'shared/hr'
import { NavPics } from 'pictures'
import React from 'react'
import SellerInfo from 'shared/seller-info'
import Video from 'shared/video'
import withConsumerProps from 'ext/recompose/with-consumer-props'
import { withRouter } from 'react-router'
import { branch, compose, lifecycle, renderNothing, withHandlers, withProps } from 'recompose'
import { Container, Description, Footer, MainContent, Sidebar, SidebarContent, Topbar } from 'shared/shell'

const Plp = ({ goBack, products, taxon }) => (
  <React.Fragment>
    <Topbar />
    <Container>
      <Sidebar>
        <SidebarContent>
          <SellerInfo taxon={taxon} />
          <Hr />
          <Breadcrumbs goBack={goBack} items={[{ path: '/', text: 'home' }, { text: taxon.name }]} />
          <Description>{taxon.description}</Description>
          <Hr />
        </SidebarContent>
        <Footer />
      </Sidebar>
      <MainContent>
        <Video videoId="zLc8-F-siNA" />
        <NavPics products={products} taxon={taxon} />
      </MainContent>
      <Footer main />
    </Container>
  </React.Fragment>
)

export default compose(
  graphql(
    gql`
      query($permalink: String!) {
        taxon(permalink: $permalink) {
          permalink
          name
          description
          iconUrl
          products {
            edges {
              node {
                id
                name
                slug
                featuredImage
                priceInCents
              }
            }
          }
        }
      }
    `,
    {
      options: ({ match }) => ({
        variables: { permalink: `collections/${match.params.slug}` },
      }),
    }
  ),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    products: data.taxon.products.edges.map(e => e.node),
    taxon: data.taxon,
  })),
  withConsumerProps(AppContext.Consumer, ({ setProducts, setTaxons, taxons }) => ({ setProducts, setTaxons, taxons })),
  withRouter,
  withHandlers({
    goBack: ({ history }) => history.goBack,
  }),
  lifecycle({
    componentWillMount() {
      const { products, setProducts, setTaxons, taxon, taxons } = this.props
      const productsHash = products.reduce((a, e) => {
        a[e.slug] = e
        return a
      }, {})
      setProducts(productsHash)
      setTaxons({ ...taxons, [taxon.permalink]: taxon })
    },
  })
)(Plp)
