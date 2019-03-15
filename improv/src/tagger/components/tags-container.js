import React from 'react'
import styled from 'styled-components'
import Tag from './tag'
import TagsNavigator from './tags-navigator'

const Container = styled.div`
  flex: 5;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
`

const TagsContainer = ({
  tags,
  onPressTagKey,
  setTagGroupIndex,
  tagsMatrix,
  currentProduct,
  tagGroupIndex,
  tagsLength,
}) => (
  <Container>
    <TagsNavigator
      setTagGroupIndex={setTagGroupIndex}
      tagGroupIndex={tagGroupIndex}
      tagsLength={tagsLength}
      tagsMatrix={tagsMatrix}
    />
    {tags.map((tag, index) => (
      <Tag
        currentProduct={currentProduct}
        key={tag}
        keyCode={String(index + 1)}
        onClick={() => onPressTagKey(index + 1)}
        tag={tag}
      />
    ))}
  </Container>
)

export default TagsContainer
