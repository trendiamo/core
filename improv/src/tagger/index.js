import Buttons from './components/buttons'
import data from './data'
import ProductsAndTags from './components/products-and-tags'
import React from 'react'
import Spinner from 'shared/loading-spinner'
import styled from 'styled-components'
import withHotkeys from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { copyToClipboard, createClientRecord, getClient, parseProducts, updateClientRecords } from 'utils'

const keyboard = {
  a: 65,
  d: 68,
  j: 74,
  k: 75,
  up: 38,
  down: 40,
  s: 83,
  w: 87,
}

const H1 = styled.h1`
  width: 100%;
  margin: 0 0 1rem 0;
  text-align: center;
`

const HelpText = styled.div`
  color: #444;
  font-size: 14px;
  text-align: center;
  margin-bottom: 1rem;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Tagger = ({ onCopyResult, ...props }) => (
  <Flex>
    <H1>{'Products Tagger'}</H1>
    <ProductsAndTags data={data} {...props} />
    <HelpText>{'Hotkeys: 1-9: tagging; W|S: navigate products'}</HelpText>
    <Buttons onCopyResult={onCopyResult} />
  </Flex>
)

export default compose(
  withState('products', 'setProducts', () => parseProducts()),
  withState('pageProducts', 'setPageProducts', []),
  withState('productIndex', 'setProductIndex', 0),
  withState('isLoading', 'setIsLoading', true),
  withState('client', 'setClient', false),
  withState('changedProducts', 'setChangedProducts', []),
  withState('multipleSelect', 'setMultipleSelect', []),
  withProps(({ productIndex, products }) => ({
    currentProduct: products && products[productIndex],
  })),
  withHandlers({
    changeProducts: ({ products }) => ({ tag, productIds }) => {
      return products.map((product, index) => {
        if (productIds.indexOf(index) === -1) return product
        if (tag.key) {
          product[tag.key] = !product[tag.key]
        } else {
          product.tag = product.tag === tag ? '' : tag || product.tag
        }
        return product
      })
    },
  }),
  withHandlers({
    toggleTag: ({ setProducts, changeProducts, multipleSelect, productIndex }) => tag => {
      const productIds = multipleSelect.length > 0 ? multipleSelect : [productIndex]
      setProducts(changeProducts({ productIds, tag }))
    },
  }),
  withHandlers({
    onCopyResult: ({ setChangedProducts, client, products, setClient, setIsLoading }) => async () => {
      copyToClipboard(JSON.stringify({ products }))
      setIsLoading(true)
      if (client) {
        await updateClientRecords(client._id, { products })
        setChangedProducts([])
      } else {
        const json = await createClientRecord({ hostname: location.hostname, products })
        setClient(json)
        setChangedProducts([])
      }
      setIsLoading(false)
    },
    goToProduct: ({ setProductIndex, productIndex, products, setMultipleSelect }) => index => {
      let newIndex = index
      setMultipleSelect([])
      if (index === 'next') {
        newIndex = Math.min(products.length - 1, productIndex + 1)
      } else if (index === 'prev') {
        newIndex = Math.max(0, productIndex - 1)
      }
      setProductIndex(newIndex)
    },
    selectMultiple: ({ setMultipleSelect, multipleSelect, productIndex, setProductIndex, products }) => ({
      index,
      bulk,
    }) => {
      if (bulk) {
        const array = []
        for (let i = Math.min(productIndex, index); i <= Math.max(productIndex, index); i++) {
          array.push(i)
        }
        return setMultipleSelect(array)
      }
      const indexOfSelect = multipleSelect.indexOf(index)
      if (indexOfSelect !== -1) {
        if (indexOfSelect === 0 && products.length > index + 1) {
          setProductIndex(index + 1)
        }
        multipleSelect.splice(indexOfSelect, 1)
        return setMultipleSelect(multipleSelect)
      }
      setMultipleSelect([...new Set([...multipleSelect, index])])
    },
  }),
  withHotkeys({
    [keyboard.w]: ({ goToProduct, selectMultiple, multipleSelect, productIndex }) => event => {
      if (event.shiftKey) {
        const index = multipleSelect.length === 0 ? productIndex - 1 : multipleSelect[0] - 1
        selectMultiple({ index, bulk: true })
        return
      }
      goToProduct('prev', true)
    },
    [keyboard.s]: ({ goToProduct, selectMultiple, multipleSelect, productIndex }) => event => {
      if (event.shiftKey) {
        const index = multipleSelect.length === 0 ? productIndex + 1 : multipleSelect[multipleSelect.length - 1] + 1
        selectMultiple({ index, bulk: true })
        return
      }
      goToProduct('next', true)
    },
  }),
  lifecycle({
    async componentDidMount() {
      const { setClient, setIsLoading, products, setProducts, getModalState, setPageProducts } = this.props
      const client = await getClient(location.hostname)
      if (client && !getModalState()) return
      if (client.length > 0) {
        setClient(client[0])
        products.forEach(product => {
          const clientProduct = client[0].products.find(o => o.id === product.id)
          const clientProductIndex = client[0].products.findIndex(o => o.id === product.id)
          if (clientProduct) {
            product.tag = clientProduct.tag
            product.highlight = clientProduct.highlight
            client[0].products.splice(clientProductIndex, 1)
          }
        })
        setProducts([...products, ...client[0].products])
        setPageProducts(products)
      }
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(Spinner))
)(Tagger)
