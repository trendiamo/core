import React from 'react'
import styled from 'styled-components'
import Tag from './tag'
import withHotkeys from 'ext/recompose/with-hotkeys'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { copyToClipboard, parseProducts } from 'utils'

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

const TagsContainer = styled.div`
  flex: 5;
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

const tags = ['Basics', 'Business', 'Casual', 'Classic']

const Tagger = ({ currentProduct, onClickTag, onCopyResult, taggings }) => (
  <Flex>
    <H1>{'Tag all these products, yo.'}</H1>
    <ProductAndTags>
      <ProductContainer>
        <Img alt="" src={currentProduct.images[0].src} />
        <p>{currentProduct.title}</p>
        <p>{currentProduct.displayPrice}</p>
      </ProductContainer>
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag
            key={tag}
            keyCode={String(index + 1)}
            onClick={onClickTag}
            tag={tag}
            taggings={taggings[currentProduct.url]}
          />
        ))}
      </TagsContainer>
    </ProductAndTags>
    <HelpText>
      {'Press the number keys to set/unset tags, then use j, k to navigate. All changes are autosaved.'}
    </HelpText>
    <button onClick={onCopyResult} type="button">
      {'copy result to clipboard'}
    </button>
  </Flex>
)

export default compose(
  withProps({ products: parseProducts() }),
  withState('productIndex', 'setProductIndex', 0),
  withHandlers({
    nextProduct: ({ productIndex, products, setProductIndex }) => () => {
      if (productIndex < products.length - 1) setProductIndex(productIndex + 1)
    },
    prevProduct: ({ productIndex, setProductIndex }) => () => {
      if (productIndex > 0) setProductIndex(productIndex - 1)
    },
  }),
  withProps(({ productIndex, products }) => ({
    currentProduct: products && products[productIndex],
  })),
  withState('taggings', 'setTaggings', ({ products }) =>
    products.reduce((acc, product) => {
      acc[product.url] = {}
      return acc
    }, {})
  ),
  withHandlers({
    toggleTagging: ({ currentProduct, taggings, setTaggings }) => tag => {
      setTaggings({
        ...taggings,
        [currentProduct.url]: {
          ...taggings[currentProduct.url],
          [tag]: !taggings[currentProduct.url][tag],
        },
      })
    },
  }),
  withHandlers({
    onClickTag: ({ toggleTagging }) => toggleTagging,
    onPressTagKey: ({ toggleTagging }) => tagKey => {
      const tag = tags[Number(tagKey) - 1]
      toggleTagging(tag)
    },
    onCopyResult: ({ taggings, products }) => () => copyToClipboard(JSON.stringify({ taggings, products })),
  }),
  withHotkeys({
    [jKey]: ({ nextProduct }) => nextProduct,
    [kKey]: ({ prevProduct }) => prevProduct,
    49: ({ onPressTagKey }) => () => onPressTagKey(1),
    50: ({ onPressTagKey }) => () => onPressTagKey(2),
    51: ({ onPressTagKey }) => () => onPressTagKey(3),
    52: ({ onPressTagKey }) => () => onPressTagKey(4),
  })
)(Tagger)
