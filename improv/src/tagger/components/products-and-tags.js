import ProductsTable from './products-table'
import React from 'react'
import styled from 'styled-components'
import Tags from './tags'

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

const FormFit = styled.div`
  color: #333;
  margin-bottom: 10px;
  font-size: 14px;
`

const Price = styled.div`
  color: #333;
`

const Product = ({ currentProduct }) => (
  <ProductContainer>
    <Img alt="" src={currentProduct.images[0].src} />
    <Name>{currentProduct.title}</Name>
    <FormFit>{currentProduct.formFit}</FormFit>
    <Price>{currentProduct.displayPrice}</Price>
  </ProductContainer>
)

const ProductsAndTags = ({ changedProducts, currentProduct, data, ...props }) => (
  <ProductAndTags>
    <ProductsTable changedProducts={changedProducts} {...props} />
    <Product currentProduct={currentProduct} />
    <Tags currentProduct={currentProduct} data={data} {...props} />
  </ProductAndTags>
)

export default ProductsAndTags
