import Buttons from './components/buttons'
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

const tagsMatrix = [
  ['Basics', 'Business', 'Casual', 'Classic'],
  ['Shirts', 'Pants', 'Jackets', 'Accessories'],
  ['Slim Fit', 'Regular Fit', 'Classic Fit', 'Modern Fit'],
  ['Red', 'Blue', 'Yellow', 'Geen'],
  [{ key: 'highlight', name: 'Highlight' }],
]

const Tagger = ({ onCopyResult, nextScreen, prevScreen, ...props }) => (
  <Flex>
    <H1>{'Products Tagger'}</H1>
    <ProductsAndTags nextScreen={nextScreen} prevScreen={prevScreen} tagsMatrix={tagsMatrix} {...props} />
    <HelpText>{'Hotkeys: 1-9: tagging; W|S: navigate products; A|D: navigate tabs'}</HelpText>
    <Buttons nextScreen={nextScreen} onCopyResult={onCopyResult} prevScreen={prevScreen} />
  </Flex>
)

export default compose(
  withState('products', 'setProducts', () => parseProducts()),
  withState('productIndex', 'setProductIndex', 0),
  withState('tagGroupIndex', 'setTagGroupIndex', 0),
  withState('isLoading', 'setIsLoading', true),
  withState('client', 'setClient', false),
  withState('changedProducts', 'setChangedProducts', []),
  withState('multipleSelect', 'setMultipleSelect', []),
  withProps(({ productIndex, products }) => ({
    currentProduct: products && products[productIndex],
  })),
  withHandlers({
    nextScreen: ({ tagGroupIndex, setTagGroupIndex }) => () => {
      if (tagGroupIndex < tagsMatrix.length - 1) return setTagGroupIndex(tagGroupIndex + 1)
    },
    prevScreen: ({ tagGroupIndex, setTagGroupIndex }) => () => {
      if (tagGroupIndex > 0) return setTagGroupIndex(tagGroupIndex - 1)
    },
    changeProduct: ({ productIndex, products }) => ({ tag, product, index }) => {
      const tagIsSimple = typeof tag === 'string'
      const cancelOut = index === undefined ? true : index <= productIndex
      const currentProduct = products[productIndex]
      let currentValue = false
      if (tagIsSimple) {
        currentValue = currentProduct.tags ? !!currentProduct.tags[tag] : false
      } else {
        currentValue = currentProduct ? !!currentProduct[tag.key] : false
      }
      const value = !cancelOut ? currentValue : !currentValue
      if (tagIsSimple) {
        if (!product.tags) {
          product.tags = { [tag]: value }
        } else {
          product.tags[tag] = value
        }
      } else {
        product[tag.key] = value
      }
      return product
    },
  }),
  withHandlers({
    toggleTag: ({ changedProducts, setChangedProducts, products, setProducts, changeProduct, productIndex }) => ({
      tag,
      index,
    }) => {
      const currentIndex = index !== undefined ? index : productIndex
      const productToTag = products[currentIndex]
      products[currentIndex] = changeProduct({ product: productToTag, tag, index })
      changedProducts[currentIndex]
        ? (changedProducts[currentIndex][tag] = !changedProducts[currentIndex][tag])
        : (changedProducts[currentIndex] = { [tag]: !!tag })
      setChangedProducts(changedProducts)
      setProducts(products)
    },
  }),
  withHandlers({
    onPressTagKey: ({ toggleTag, tagGroupIndex, multipleSelect }) => tagKey => {
      const tag = tagsMatrix[tagGroupIndex][Number(tagKey) - 1]
      if (multipleSelect.length > 0) {
        multipleSelect.map(index => {
          toggleTag({ tag, index })
        })
        return
      }
      toggleTag({ tag })
    },
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
    [keyboard.d]: ({ nextScreen }) => nextScreen,
    [keyboard.a]: ({ prevScreen }) => prevScreen,

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

    49: ({ onPressTagKey }) => () => onPressTagKey(1),
    50: ({ onPressTagKey }) => () => onPressTagKey(2),
    51: ({ onPressTagKey }) => () => onPressTagKey(3),
    52: ({ onPressTagKey }) => () => onPressTagKey(4),
    //  numpad keys
    97: ({ onPressTagKey }) => () => onPressTagKey(1),
    98: ({ onPressTagKey }) => () => onPressTagKey(2),
    99: ({ onPressTagKey }) => () => onPressTagKey(3),
    100: ({ onPressTagKey }) => () => onPressTagKey(4),
  }),
  lifecycle({
    async componentDidMount() {
      const { setClient, setIsLoading, products, setProducts, getModalState } = this.props
      const client = await getClient(location.hostname)
      if (client && !getModalState()) return
      if (client.length > 0) {
        setClient(client[0])
        products.forEach(product => {
          const clientProduct = client[0].products.find(o => o.url === product.url)
          const clientProductIndex = client[0].products.findIndex(o => o.url === product.url)
          if (clientProduct) {
            product.tags = clientProduct.tags
            product.highlight = clientProduct.highlight
            client[0].products.splice(clientProductIndex, 1)
          }
        })
        setProducts([...products, ...client[0].products])
      }
      setIsLoading(false)
    },
  }),
  branch(({ isLoading }) => isLoading, renderComponent(Spinner))
)(Tagger)
