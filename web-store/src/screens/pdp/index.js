import AppContext from 'app/app-context'
import Breadcrumbs from 'shared/breadcrumbs'
import { DisabledButton } from 'shared/buttons'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Helmet from 'react-helmet'
import Hidden from 'shared/hidden'
import Hr from 'shared/hr'
import OrderConfirmedModal from './order-confirmed-modal'
import PaymentIcons from './payment-icons'
import PaypalButton from './paypal-button'
import React from 'react'
import SellerInfo from 'shared/seller-info'
import StripeButton from './stripe-button'
import styled from 'styled-components'
import withConsumerProps from 'ext/recompose/with-consumer-props'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { Container, Description, Footer, Sidebar, SidebarContent, Topbar } from 'shared/shell'
import { LargeScreenPics, SmallScreenPics } from 'pictures'

const Price = styled.div`
  text-align: center;
  font-weight: 500;
  color: #222;
  margin-bottom: 1rem;
  font-size: 20px;
`

const H1 = styled.h1`
  margin: 0;
  color: #222;
`

const SubHeader = styled.p`
  margin: -8px 0 0 0;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  color: #6a6a6a;
`

const Pdp = ({
  closeModal,
  handlePaypalSuccess,
  orderConfirmationInfo,
  priceString,
  priceStringSchema,
  product,
  taxon,
}) => (
  <React.Fragment>
    <Topbar />
    <Container>
      <Helmet>
        <title>{product.name}</title>
        <meta content={product.description} name="description" />
        <meta content={product.name} property="og:title" />
        <meta content="product" property="og:type" />
        <meta content={product.description} property="og:description" />
        <meta content={product.price} property="og:price:amount" />
        <meta content="EUR" property="og:price:currency" />
        <meta content={`http:${product.featuredImage}`} property="og:image" />
        <meta content={`https:${product.featuredImage}`} property="og:image:secure_url" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content={product.name} name="twitter:title" />
        <meta content={product.description} name="twitter:description" />
      </Helmet>
      <Sidebar>
        <SidebarContent itemScope itemType="http://schema.org/Product">
          <SellerInfo taxon={taxon} />
          {product.images && product.images.length > 0 && <SmallScreenPics images={product.images} />}
          <Hr />
          <Breadcrumbs items={[{ path: '/', text: 'home' }, { text: product.name }]} />
          <header>
            <H1 itemProp="name">{product.name}</H1>
            <SubHeader itemProp="brand">{product.vendor}</SubHeader>
          </header>
          <Description itemProp="description">{product.description}</Description>
          <Hr />
          <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
            <Hidden>
              <span itemProp="price">{priceStringSchema}</span>
              <span content="EUR" itemProp="priceCurrency">
                {'€'}
              </span>
            </Hidden>
            <Price>{priceString}</Price>
            {product.available ? (
              <PaypalButton handleSuccess={handlePaypalSuccess} price={product.price} />
            ) : (
              <DisabledButton>{'Not available'}</DisabledButton>
            )}
            <StripeButton product={product} />
          </div>
          <Hr />
          <PaymentIcons />
        </SidebarContent>
        <Footer />
      </Sidebar>
      {product.images && product.images.length > 0 && <LargeScreenPics product={product} />}
      <OrderConfirmedModal closeModal={closeModal} orderConfirmationInfo={orderConfirmationInfo} />
      <Footer main />
    </Container>
  </React.Fragment>
)

export default compose(
  withConsumerProps(AppContext.Consumer, ({ store }) => ({ store })),
  withProps(({ match, store }) => ({
    partialProduct: store.products[match.params.slug],
    partialTaxon: store.taxons[match.params.tslug],
  })),
  graphql(
    gql`
      query($permalink: String!, $slug: String!) {
        taxon(permalink: $permalink) {
          permalink
          name
          description
          iconUrl
        }
        product(slug: $slug) {
          id
          name
          slug
          description
          priceInCents
          featuredImage
          images
          master {
            id
          }
          variants {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
    {
      options: ({ match }) => ({
        variables: { permalink: `collections/${match.params.tslug}`, slug: match.params.slug },
      }),
    }
  ),
  branch(
    ({ data, partialProduct, partialTaxon }) =>
      data && (data.loading || data.error) && (!partialProduct || !partialTaxon),
    renderNothing
  ),
  withProps(({ data, partialProduct, partialTaxon }) => ({
    product: { ...partialProduct, ...data.product },
    taxon: { ...partialTaxon, ...data.taxon },
  })),
  withState('orderConfirmationInfo', 'setOrderConfirmationInfo', null),
  withHandlers({
    closeModal: ({ setOrderConfirmationInfo }) => () => {
      setOrderConfirmationInfo(null)
    },
    handlePaypalSuccess: ({ product, setOrderConfirmationInfo }) => info => {
      setOrderConfirmationInfo({
        ...info,
        product,
      })
    },
  }),
  withProps(({ product }) => ({
    priceString: (product.priceInCents / 100).toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }),
    priceStringSchema: (product.priceInCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 }),
  }))
)(Pdp)
