import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { Card, CardContent, CardImg } from 'shared/card'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'
import { markGoFwd } from 'app/setup/flow-history'

const TitleAndPrice = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.div`
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #181818;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`

const Price = styled.div`
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1px;
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

const ProductMessage = compose(
  withHandlers({
    onClick: ({ product }) => () => {
      mixpanel.track('Clicked Product', { hostname: location.hostname, url: product.url }, () => {
        markGoFwd()
        window.location = product.url
      })
    },
  })
)(({ product, onClick }) => (
  <Card onClick={onClick} style={{ minWidth: '260px', cursor: 'pointer' }}>
    <CardImg
      src={imgixUrl(product.picUrl, { fit: 'crop', w: 180, h: 180 })}
      style={{ height: '180px', objectFit: 'cover' }}
    />
    <CardContent>
      <TitleAndPrice>
        <Title>{product.title}</Title>
        <Price>{product.displayPrice}</Price>
      </TitleAndPrice>
    </CardContent>
    <CtaTextContainer>{product.cardCta}</CtaTextContainer>
  </Card>
))

export default ProductMessage
