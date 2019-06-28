import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withProps } from 'recompose'
import { useMultipleTagging } from 'utils'

const Key = styled.div`
  background-color: ${({ selected }) => (selected ? '#b3a87d' : '#f4f1e4')};
  color: ${({ selected }) => (selected ? '#fafafa' : '#222')};
  border: 1px solid #b3a87d;
  border-radius: 4px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  font-family: monospace;
  font-size: 16px;
`

const Label = styled.div`
  flex: 1;
  padding-left: 0.8rem;
  line-height: 25px;
`

const TagBase = styled.div`
  display: flex;
  background-color: #eeece6;
  &:hover {
    background-color: #dddbd0;
  }
  border: 1px solid #b3a87d;
  border-top: 0;
  padding: 2px;
  cursor: pointer;
  font-weight: ${({ selected }) => (selected ? '500' : 'normal')};
`

const isTagSelected = ({ currentTagKey, tag, currentProduct }) => {
  if (currentTagKey) {
    return currentProduct[currentTagKey] && currentProduct[currentTagKey].includes(tag)
  }
  if (tag.key) {
    return currentProduct[tag.key]
  }
  if (useMultipleTagging) {
    return currentProduct.tags && currentProduct.tags.includes(tag)
  }
  return currentProduct.tag === tag
}

const TagContainer = ({ keyCode, label, onClick, selected }) => (
  <TagBase onClick={onClick} selected={selected}>
    <Key selected={selected}>{keyCode}</Key>
    <Label>{label}</Label>
  </TagBase>
)

const Tag = compose(
  withHandlers({
    onClick: ({ onClick, tag }) => () => onClick(tag),
  }),
  withProps(({ currentProduct, currentTagKey, tag }) => ({
    selected: isTagSelected({ currentTagKey, tag, currentProduct }),
    label: typeof tag === 'string' ? tag : tag.name,
  }))
)(TagContainer)

export default Tag
