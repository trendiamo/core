import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withProps } from 'recompose'

const Key = styled.div``
const Label = styled.div``
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

  ${Key} {
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
  }

  ${Label} {
    flex: 1;
    padding-left: 0.8rem;
    line-height: 25px;
  }
`

const Tag = compose(
  withHandlers({
    onClick: ({ onClick, tag }) => () => onClick(tag),
  }),
  withProps(({ currentProduct, tag }) => {
    return {
      selected: tag.key ? currentProduct[tag.key] : currentProduct.tag === tag,
      label: typeof tag === 'string' ? tag : tag.name,
    }
  })
)(({ keyCode, label, onClick, selected }) => (
  <TagBase onClick={onClick} selected={selected}>
    <Key>{keyCode}</Key>
    <Label>{label}</Label>
  </TagBase>
))

export default Tag
