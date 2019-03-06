import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const Key = styled.div``
const Label = styled.div``
const TagBase = styled.div`
  display: flex;
  background-color: #eeece6;
  &:hover {
    background-color: #dddbd0;
  }
  border: 1px solid #b3a87d;
  border-radius: 4px;
  padding: 0.3rem;
  margin-bottom: 1rem;
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
  })
)(({ keyCode, tag, taggings, onClick }) => (
  <TagBase onClick={onClick} selected={taggings[tag]}>
    <Key>{keyCode}</Key>
    <Label>{tag}</Label>
  </TagBase>
))

export default Tag
