import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85%;
  background: #eeece6;
  border-radius: 4px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  user-select: none;
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
  background: ${({ active }) => (active ? 'white' : 'rgba(255, 255, 255, 0.3)')};
  ${({ changedProducts, index }) =>
    changedProducts[index] && Object.values(changedProducts[index]).includes(true)
      ? 'border: 2px solid #fb0;'
      : 'border: 2px solid #eeece6;'}

  &:hover {
    ${({ active }) => !active && 'background-color: #dddbd0;'}
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

const ButtonsContainer = styled.div`
  display: flex;
  width: 250px;
  height: 15%;
  justify-content: space-between;
`

const NavigationButtons = ({ next, prev }) => (
  <ButtonsContainer>
    <Button onClick={prev} style={{ width: '50%', margin: 0 }}>
      {'Previous'}
    </Button>
    <Button onClick={next} style={{ width: '50%', margin: 0 }}>
      {'Next'}
    </Button>
  </ButtonsContainer>
)

const Container = styled.div`
  height: 300px;
  width: 250px;
`

const TableTemplate = ({ products, changedProducts, productIndex, onClick, multipleSelect }) => (
  <TableContainer>
    <ListHeader>{'Products'}</ListHeader>
    <TableColumn>
      <List>
        {products.map((product, index) => (
          <ListElement
            active={productIndex === index || multipleSelect.indexOf(index) !== -1}
            changedProducts={changedProducts}
            key={product.url}
            onClick={event => onClick({ event, index })}
          >{`${index + 1} : ${product.title}`}</ListElement>
        ))}
      </List>
    </TableColumn>
  </TableContainer>
)

const Table = compose(
  withHandlers({
    onClick: ({ goToProduct, selectMultiple }) => ({ event, index }) => {
      if (event.shiftKey) {
        selectMultiple({ index, bulk: true })
        return
      }
      if (event.ctrlKey) {
        selectMultiple({ index })
        return
      }
      goToProduct(index)
    },
  })
)(TableTemplate)

const ProductsTable = ({ goToProduct, ...props }) => (
  <Container>
    <Table goToProduct={goToProduct} {...props} />
    <NavigationButtons next={() => goToProduct('next')} prev={() => goToProduct('prev')} />
  </Container>
)

export default ProductsTable
