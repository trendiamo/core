import React from 'react'
import Spinner from 'shared/loading-spinner'
import styled from 'styled-components'
import TagsContainer from './tags-container'
import withHotkeys from 'ext/recompose/with-hotkeys'
import { branch, compose, lifecycle, renderComponent, withHandlers, withProps, withState } from 'recompose'
import { copyToClipboard, createClientRecord, getClient, parseProducts, updateClientRecords } from 'utils'

const jKey = 74 // ascii code for j key
const kKey = 75 // ascii code for k key

const H1 = styled.h1`
  width: 100%;
  margin: 0 0 1rem 0;
`

const ProductAndTags = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
`

const ProductContainer = styled.div`
  flex: 2;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`

const HelpText = styled.div`
  color: #444;
  font-size: 14px;
  text-align: center;
  margin-bottom: 1rem;
`

const Img = styled.img`
  width: 100%;
  min-width: 200px;
  max-height: 200px;
  object-fit: cover;
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

const Tagger = ({ currentProduct, onClickTag, onCopyResult, nextScreen, prevScreen, tagGroupIndex }) => (
  <Flex>
    <H1>{'Tag all these products, yo.'}</H1>
    <ProductAndTags>
      <ProductContainer>
        <Img alt="" src={currentProduct.images[0].src} />
        <p>{currentProduct.title}</p>
        <p>{currentProduct.displayPrice}</p>
      </ProductContainer>
      <TagsContainer
        currentProduct={currentProduct}
        nextScreen={nextScreen}
        onClickTag={onClickTag}
        prevScreen={prevScreen}
        tagGroupIndex={tagGroupIndex}
        tags={tagsMatrix[tagGroupIndex]}
        tagsLength={tagsMatrix.length}
      />
    </ProductAndTags>
    <HelpText>{'Press the number keys to set/unset tags, then use j, k to navigate.'}</HelpText>
    <button onClick={onCopyResult} type="button">
      {'Update Products'}
    </button>
  </Flex>
)

export default compose(
  withState('products', 'setProducts', () => parseProducts()),
  withState('productIndex', 'setProductIndex', 0),
  withState('tagGroupIndex', 'setTagGroupIndex', 0),
  withState('isLoading', 'setIsLoading', true),
  withState('client', 'setClient', false),
  withHandlers({
    nextScreen: ({ productIndex, products, setProductIndex, tagGroupIndex, setTagGroupIndex }) => () => {
      if (tagGroupIndex < tagsMatrix.length - 1) return setTagGroupIndex(tagGroupIndex + 1)
      if (productIndex < products.length - 1) {
        setTagGroupIndex(0)
        setProductIndex(productIndex + 1)
      }
    },
    prevScreen: ({ productIndex, setProductIndex, tagGroupIndex, setTagGroupIndex }) => () => {
      if (tagGroupIndex > 0) return setTagGroupIndex(tagGroupIndex - 1)
      if (productIndex > 0) {
        setTagGroupIndex(tagsMatrix.length - 1)
        setProductIndex(productIndex - 1)
      }
    },
    changeProduct: () => ({ tag, product }) => {
      const tagIsSimple = typeof tag === 'string'
      if (!tagIsSimple) {
        product[tag.key] = !product[tag.key]
        return product
      }
      if (!product.tags) {
        product.tags = { [tag]: true }
      } else {
        !product.tags[tag] ? (product.tags[tag] = true) : (product.tags[tag] = !product.tags[tag])
      }
      return product
    },
  }),
  withProps(({ productIndex, products }) => ({
    currentProduct: products && products[productIndex],
  })),
  withHandlers({
    toggleTag: ({ currentProduct, products, setProducts, changeProduct }) => tag => {
      const product = products.find(product => product.url === currentProduct.url)
      const productIndex = products.findIndex(product => product.url === currentProduct.url)
      products[productIndex] = changeProduct({ product, tag })
      setProducts(products)
    },
  }),
  withHandlers({
    onClickTag: ({ toggleTag }) => toggleTag,
    onPressTagKey: ({ toggleTag, tagGroupIndex }) => tagKey => {
      const tag = tagsMatrix[tagGroupIndex][Number(tagKey) - 1]
      toggleTag(tag)
    },
    onCopyResult: ({ client, products, setClient, setIsLoading }) => async () => {
      copyToClipboard(JSON.stringify({ products }))
      setIsLoading(true)
      if (client) {
        await updateClientRecords(client._id, { products })
      } else {
        const json = await createClientRecord({ hostname: location.hostname, products })
        setClient(json)
      }
      setIsLoading(false)
    },
  }),
  withHotkeys({
    [jKey]: ({ nextScreen }) => nextScreen,
    [kKey]: ({ prevScreen }) => prevScreen,
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
