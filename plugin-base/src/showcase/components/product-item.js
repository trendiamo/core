import React, { useCallback } from 'react'
import styled from 'styled-components'
import { imgixUrl } from 'tools'
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
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 0;
  .Win32 & {
    font-weight: 600;
  }
`

const Description = styled.div`
  flex: 1;
  font-size: 12px;
  .Win32 & {
    letter-spacing: -0.4px;
  }
`

const DisplayPrice = styled.div`
  font-size: 13px;
  font-weight: bold;
`

const ProductItem = ({ selectInList, product, onProductClick, spotlight }) => {
  const onClick = useCallback(
    () => {
      onProductClick(product, spotlight)
    },
    [onProductClick, product, spotlight]
  )

  return (
    <ListItem onClick={onClick} selectInList={selectInList}>
      <ListImg picture={imgixUrl(product.picture.url, { fit: 'crop', w: 101, h: 101 })} />
      <ListContent>
        <Content>
          <Name>{product.name}</Name>
          <Description dangerouslySetInnerHTML={{ __html: product.description }} />
          <DisplayPrice>{product.displayPrice}</DisplayPrice>
        </Content>
      </ListContent>
      <ListChevron />
    </ListItem>
  )
}

export default ProductItem
