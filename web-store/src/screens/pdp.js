import Breadcrumbs from '../shared/breadcrumbs'
import Helmet from 'react-helmet'
import Hidden from '../shared/hidden'
import Hr from '../shared/hr'
import IconMastercard from '../icons/mastercard'
import IconPaypal from '../icons/paypal'
import IconVisa from '../icons/visa'
import products from '../products.json'
import React from 'react'
import SellerInfo from '../shared/seller-info'
import styled from 'styled-components'
import { Button, DisabledButton } from '../shared/buttons'
import { compose, withProps } from 'recompose'
import { Container, Footer, Sidebar, SidebarContent } from '../shared/shell'
import { LargeScreenPics, SmallScreenPics } from '../pictures'

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

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
`

const IconContainer = styled.div`
  background-color: #d1d1d1;
  border-radius: 5px;
  width: 60px;
  height: 30px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 80%;
    width: 80%;
  }
`

const Pdp = ({ priceString, priceStringSchema, product }) => (
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
        <SellerInfo />
        <SmallScreenPics images={product.images} />
        <Hr />
        <Breadcrumbs title={product.name} />
        <header>
          <H1 itemProp="name">{product.name}</H1>
          <SubHeader itemProp="brand">{product.vendor}</SubHeader>
        </header>
        <p itemProp="description">{product.description}</p>
        <Hr />
        <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
          <Hidden>
            <span itemProp="price">{priceStringSchema}</span>
            <span content="EUR" itemProp="priceCurrency">
              {'€'}
            </span>
          </Hidden>
          <Price>{priceString}</Price>
          {product.available ? <Button>{'Buy now'}</Button> : <DisabledButton>{'Not available'}</DisabledButton>}
        </div>
        <Hr />
        <IconsContainer>
          <IconContainer>
            <IconPaypal />
          </IconContainer>
          <IconContainer>
            <IconVisa />
          </IconContainer>
          <IconContainer>
            <IconMastercard />
          </IconContainer>
        </IconsContainer>
      </SidebarContent>
      <Footer />
    </Sidebar>
    <LargeScreenPics product={product} />
  </Container>
)

export default compose(
  withProps(({ match }) => ({
    product: products[match.params.id],
  })),
  withProps(({ product }) => ({
    priceString: product.price.toLocaleString('de-DE', { currency: 'EUR', style: 'currency' }),
    priceStringSchema: product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }),
  }))
)(Pdp)
