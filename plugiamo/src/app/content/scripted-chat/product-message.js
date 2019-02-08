import styled from 'styled-components'
import { Card, CardContent, CardImg } from 'shared/card'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
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

const ProductCard = styled(Card)`
  animation: _frekkls_message_appear 0.6s ease-out;
`

const ProductMessage = compose(
  withHandlers({
    onClick: ({ product }) => () => {
      markGoFwd()
      window.location = product.url
    },
  })
)(({ product, onClick }) => (
  <ProductCard onClick={onClick} style={{ minWidth: '230px', cursor: 'pointer' }}>
    <CardImg src={product.picUrl} style={{ height: '170px', objectFit: 'cover' }} />
    <CardContent>
      <Title>{product.title}</Title>
      <DescAndPrice>
        <Desc>{product.description}</Desc>
        <Price>{product.displayPrice}</Price>
      </DescAndPrice>
    </CardContent>
  </ProductCard>
))

export default ProductMessage
