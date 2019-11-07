import React, { useCallback } from 'react'
import styled from 'styled-components'
import Tag from 'shared/tag'

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #aaa;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 16px;
`

const TagSelector = ({ tags, setTags }) => {
  const onTagClick = useCallback(
    tag => {
      const newTags = [...tags]
      const index = newTags.findIndex(newTag => newTag.id === tag.id)
      newTags[index] = { ...newTags[index], active: !newTags[index].active }
      setTags(newTags)
    },
    [setTags, tags]
  )

  return (
    <Container>
      {tags.map(tag => (
        <Tag active={tag.active} clickable key={tag.id} label={tag.name} onTagClick={onTagClick} tag={tag} />
      ))}
    </Container>
  )
}

export default TagSelector
