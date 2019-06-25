import ProductsTable from './products-table'
import React from 'react'
import styled from 'styled-components'
import Tags from './tags'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { impl } from 'utils'

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

const ProductDiv = styled.div`
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

const FilterImg = styled.img`
  width: 46px;
`

const FilterIconContainer = styled.div`
  position: relative;
  display: inline-block;
  border: 2px solid ${({ productMatches }) => (productMatches ? '#1f1' : '#fff')};
  transition: border-color 0.3s;
  border-radius: 3px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${({ productMatches }) => (productMatches ? '#7f7' : 'transparent')};
    opacity: 0.3;
    transition: background 0.3s;
  }
  &:after {
    content: '';
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 50%;
    background: ${({ activeInFilters }) => (activeInFilters ? '#f33' : 'transparent')};
    width: 5px;
    height: 5px;
  }
`

const FilterIcons = ({ filters }) => (
  <div>
    {filters.map(filter => (
      <FilterIconContainer activeInFilters={filter.checked} key={filter.name} productMatches={filter.associated}>
        <FilterImg src={filter.imgUrl} />
      </FilterIconContainer>
    ))}
  </div>
)

const ProductContainer = ({ currentProduct, filterList }) => (
  <ProductDiv>
    <Img alt="" src={currentProduct.images ? currentProduct.images[0].src : currentProduct.picUrl} />
    <Name>{currentProduct.title}</Name>
    <FormFit>{currentProduct.formFit}</FormFit>
    <Price>{currentProduct.displayPrice}</Price>
    {filterList && <FilterIcons filters={filterList} />}
  </ProductDiv>
)

const Product = compose(
  withState('filterList', 'setFilterList', impl.getFilter && impl.getFilter()),
  withHandlers({
    calculateFilters: ({ filterList, setFilterList, currentProduct }) => () => {
      const newFilterList = []
      filterList.forEach(filter => {
        const newFilter = { ...filter, associated: currentProduct.filters.includes(filter.name) }
        newFilterList.push(newFilter)
      })
      setFilterList(newFilterList)
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { currentProduct, calculateFilters, filterList } = this.props
      if (!filterList) return
      if (currentProduct.id !== prevProps.currentProduct.id) {
        calculateFilters()
      }
    },
    componentDidMount() {
      const { calculateFilters, filterList } = this.props
      if (!filterList) return
      calculateFilters()
    },
  })
)(ProductContainer)

const ProductsAndTags = ({ changedProducts, currentProduct, tagList, ...props }) => (
  <ProductAndTags>
    <ProductsTable changedProducts={changedProducts} {...props} />
    <Product currentProduct={currentProduct} />
    <Tags currentProduct={currentProduct} tagList={tagList} {...props} />
  </ProductAndTags>
)

export default ProductsAndTags
