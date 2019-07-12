import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardContent, CardImg } from 'shared/card'
import { imgixUrl, stringifyRect } from 'tools'

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
  user-select: none;
`

const Link = styled.a`
  text-decoration: none;
`

const defaultStyleConfig = { card: { minWidth: 260 } }

const ProductMessage = ({ productMessage, styleConfig = defaultStyleConfig, onClick }) => {
  const productPicUrl = useMemo(
    () =>
      productMessage.picture.url &&
      imgixUrl(productMessage.picture.url, {
        rect: stringifyRect(productMessage.picRect),
        fit: 'crop',
        w: 260,
        h: styleConfig.image ? styleConfig.image.height : 180,
      }),
    [productMessage.picRect, productMessage.picture.url, styleConfig.image]
  )

  const newOnClick = useCallback(
    event => {
      if (!productMessage.newTab) {
        event.preventDefault()
      }
      onClick && onClick({ type: 'clickProduct', item: productMessage })
    },
    [onClick, productMessage]
  )

  return (
    <Link href={productMessage.url} onClick={newOnClick} rel="noopener noreferrer" target="_blank">
      <ProductCard style={styleConfig.card}>
        <ProductImage src={productPicUrl} style={styleConfig.image} />
        <CardContent style={styleConfig.details}>
          <TitleAndPrice>
            <Title style={styleConfig.detailsText}>{productMessage.title}</Title>
            <Price style={styleConfig.detailsPrice}>{productMessage.displayPrice}</Price>
          </TitleAndPrice>
        </CardContent>
        {productMessage.cardCta && <CtaTextContainer>{productMessage.cardCta}</CtaTextContainer>}
      </ProductCard>
    </Link>
  )
}

export default ProductMessage
