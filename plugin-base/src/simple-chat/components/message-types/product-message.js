import React from 'react'
import styled from 'styled-components'
import { Card, CardContent, CardImg } from 'shared/card'
import { compose, withHandlers, withProps } from 'recompose'
import { imgixUrl } from 'tools'

const TitleAndPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #181818;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  max-width: 200px;
  margin-right: 14px;
`

const Price = styled.div`
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1px;
  color: #25997e;
`

const CtaTextContainer = styled.div`
  font-weight: 500;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  border-top: 2px solid #e9e9e9;
  text-align: center;
`

const ProductCard = styled(Card)`
  min-width: 260px;
  cursor: pointer;
`

const ProductImage = styled(CardImg)`
  height: 180px;
  border-radius: 12px 12px 0 0 !important;
`

const Link = styled.a`
  text-decoration: none;
`

const defaultStyleConfig = { card: { minWidth: 260 } }

const ProductMessage = ({ product, styleConfig = defaultStyleConfig, onClick, productPicUrl }) => (
  <Link href={product.url} onClick={onClick} rel="noopener noreferrer" target="_blank">
    <ProductCard style={styleConfig.card}>
      <ProductImage src={productPicUrl} style={styleConfig.image} />
      <CardContent style={styleConfig.details}>
        <TitleAndPrice>
          <Title style={styleConfig.detailsText}>{product.title}</Title>
          <Price style={styleConfig.detailsPrice}>{product.displayPrice}</Price>
        </TitleAndPrice>
      </CardContent>
      {product.cardCta && <CtaTextContainer>{product.cardCta}</CtaTextContainer>}
    </ProductCard>
  </Link>
)

export default compose(
  withProps(({ product, styleConfig = defaultStyleConfig }) => ({
    productPicUrl:
      product.picUrl &&
      imgixUrl(product.picUrl, { fit: 'crop', w: 180, h: styleConfig.image ? styleConfig.image.height : 180 }),
  })),
  withHandlers({
    onClick: ({ product, onClick }) => event => {
      if (!product.newTab) {
        event.preventDefault()
      }
      onClick && onClick({ type: 'clickProduct', item: product })
    },
  })
)(ProductMessage)
