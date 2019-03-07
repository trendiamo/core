import React from 'react'
import styled from 'styled-components'
import Tag from './tag'

const Container = styled.div`
  flex: 5;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`

const TagsContainer = ({ tags, onClickTag, currentProduct, tagGroupIndex, tagsLength }) => (
  <Container>
    {`${tagGroupIndex + 1} / ${tagsLength}`}
    {tags.map((tag, index) => (
      <Tag key={tag} keyCode={String(index + 1)} onClick={onClickTag} tag={tag} taggings={currentProduct.tags} />
    ))}
  </Container>
)

export default TagsContainer
