import ProductsTable from './products-table'
import React from 'react'
import styled from 'styled-components'
import TagsContainer from './tags-container'

const Img = styled.img`
  width: 100%;
  min-width: 200px;
  max-height: 200px;
  object-fit: cover;
`

const ProductAndTags = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  width: 100%;
`

const ProductContainer = styled.div`
  flex: 2;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`

const Name = styled.div`
  color: #333;
  margin-bottom: 10px;
`

const Price = styled.div`
  color: #333;
`

const ProductsAndTags = ({ changedProducts, currentProduct, tagsMatrix, tagGroupIndex, ...props }) => (
  <ProductAndTags>
    <ProductsTable changedProducts={changedProducts} tagGroupIndex={tagGroupIndex} {...props} />
    <ProductContainer>
      <Img alt="" src={currentProduct.images[0].src} />
      <Name>{currentProduct.title}</Name>
      <Price>{currentProduct.displayPrice}</Price>
    </ProductContainer>
    <TagsContainer
      currentProduct={currentProduct}
      tagGroupIndex={tagGroupIndex}
      tags={tagsMatrix[tagGroupIndex]}
      tagsLength={tagsMatrix.length}
      tagsMatrix={tagsMatrix}
      {...props}
    />
  </ProductAndTags>
)

export default ProductsAndTags
