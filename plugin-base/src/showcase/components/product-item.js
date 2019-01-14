import React from 'react'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'

const ProductItem = ({ spotlight, product, onClick }) => (
  <ListItem onClick={onClick({ product, spotlight })}>
    <ListImg src={product.picture.url} />
    <ListContent>
      <div style={{ color: '#4a4a4a', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.4' }}>{product.name}</div>
        <div style={{ flex: 1, fontSize: '12px' }}>{product.description}</div>
        <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{product.displayPrice}</div>
      </div>
    </ListContent>
    <ListChevron />
  </ListItem>
)
export default ProductItem
