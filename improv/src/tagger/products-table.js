import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 150px;
  background: #eeece6;
  border-radius: 4px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const ListElement = styled.li`
  padding: 4px;
  margin: 0;
  background: rgba(255, 255, 255, 0.3);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  background: ${({ currentProductIndex, index }) =>
    currentProductIndex === index ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  ${({ changedProducts, index }) =>
    changedProducts[index] && Object.values(changedProducts[index]).includes(true)
      ? 'border: 2px solid #fb0;'
      : 'border: 2px solid #eeece6;'}

  &:hover {
    background-color: #dddbd0;
  }
`

const ListHeader = styled.p`
  font-size: 16px;
  text-align: center;
  margin: 4px;
`

const TableColumn = styled.div`
  flex: 1;
  overflow-y: scroll;
`

const ProductsTable = ({ changedProducts, productIndex, products, goToProduct }) => (
  <TableContainer>
    <ListHeader>{'Products'}</ListHeader>
    <TableColumn>
      <List>
        {products.map((product, index) => (
          <ListElement
            changedProducts={changedProducts}
            currentProductIndex={productIndex}
            index={index}
            key={product.url}
            onClick={() => goToProduct(index)}
          >{`${index + 1} : ${product.title}`}</ListElement>
        ))}
      </List>
    </TableColumn>
  </TableContainer>
)

export default compose(
  withHandlers({
    goToProduct: ({ setTagGroupIndex, setProductIndex }) => index => {
      setProductIndex(index)
      setTagGroupIndex(0)
    },
  })
)(ProductsTable)
