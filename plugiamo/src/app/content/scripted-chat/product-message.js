import styled from 'styled-components'
import { Card, CardContent, CardImg } from 'shared/card'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'
import { markGoFwd } from 'app/setup/flow-history'

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #181818;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const DescAndPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.8;
`

const Desc = styled.div`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #4a4a4a;
`

const Price = styled.div`
  white-space: nowrap;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1px;
  color: #25997e;
`

const ProductMessage = compose(
  withHandlers({
    onClick: ({ product }) => () => {
      markGoFwd()
      window.location = product.url
    },
  })
)(({ product, onClick }) => (
  <Card onClick={onClick} style={{ minWidth: '230px', cursor: 'pointer' }}>
    <CardImg
      src={imgixUrl(product.picUrl, { fit: 'crop', w: 170, h: 170 })}
      style={{ height: '170px', objectFit: 'cover' }}
    />
    <CardContent>
      <Title>{product.title}</Title>
      <DescAndPrice>
        <Desc>{product.description}</Desc>
        <Price>{product.displayPrice}</Price>
      </DescAndPrice>
    </CardContent>
  </Card>
))

export default ProductMessage
