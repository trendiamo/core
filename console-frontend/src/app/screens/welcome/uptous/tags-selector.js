import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Chip } from '@material-ui/core'

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid #aaa;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 16px;
`

const StyledChip = styled(props => <Chip {...omit(props, ['active'])} />)`
  margin: 2px;
  text-transform: uppercase;
  border-radius: 4px;
  height: 24px;
  font-family: Lato, 'Helvetica', 'Arial', sans-serif;
  ${({ active }) => !active && 'opacity: 0.5;'}
  color: #fff;
  transition: all 0.3s;
  span {
    padding: 0 6px;
    font-weight: 700;
  }
`

const Tag = ({ tag, onTagClick }) => {
  const onClick = useCallback(() => onTagClick(tag), [onTagClick, tag])

  return <StyledChip active={tag.active} color="primary" key={tag.id} label={tag.name} onClick={onClick} />
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
