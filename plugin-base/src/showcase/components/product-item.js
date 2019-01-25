import React from 'react'
import styled from 'styled-components'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'

const Content = styled.div`
  color: #4a4a4a;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
`

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Description = styled.div`
  flex: 1;
  font-size: 12px;
`

const DisplayPrice = styled.div`
  font-size: 13px;
  font-weight: bold;
`

const ProductItem = ({ spotlight, product, onClick, ...props }) => (
  <ListItem onClick={onClick({ product, spotlight })} {...props}>
    <ListImg picture={product.picture.url} />
    <ListContent>
      <Content>
        <Name>{product.name}</Name>
        <Description>{product.description}</Description>
        <DisplayPrice>{product.displayPrice}</DisplayPrice>
      </Content>
    </ListContent>
    <ListChevron />
  </ListItem>
)
export default ProductItem
