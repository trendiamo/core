import React, { useCallback } from 'react'
import styled from 'styled-components'
import TagElement from 'shared/form-elements/tag'

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #aaa;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 16px;
`

const Tag = ({ tag, onTagClick }) => {
  const onClick = useCallback(() => onTagClick(tag), [onTagClick, tag])

  return <TagElement color="primary" disabled={!tag.active} key={tag.id} label={tag.name} onClick={onClick} />
}

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
        <Tag key={tag.id} onTagClick={onTagClick} setTags={setTags} tag={tag} />
      ))}
    </Container>
  )
}

export default TagSelector
