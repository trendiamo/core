import data from 'tagger/data'
import React from 'react'
import styled from 'styled-components'
import Tag from './tag'

const Container = styled.div`
  max-height: 300px;
  overflow-y: auto;
`

const Title = styled.div`
  padding-left: 39px;
  color: #555;
  padding: 5px;
  padding-left: 40px;
  -webkit-letter-spacing: 2px;
  -moz-letter-spacing: 2px;
  -ms-letter-spacing: 2px;
  border: 1px solid #b3a87d;
  border-top: 0;
`

const GroupContainer = styled.div`
  &:first-child {
    border-top: 1px solid #b3a87d;
  }
`

const getGroupedTags = data => {
  let groupName
  const groups = data
    .map(tag => {
      const tagGroupName = typeof tag === 'string' ? tag.split('/')[0] : '_additional'
      if (!groupName || groupName !== tagGroupName) {
        groupName = tagGroupName
        return groupName
      }
    })
    .filter(e => e)
  const groupedTags = groups.map(group => {
    if (group === '_additional') {
      const tags = data.filter(tag => typeof tag !== 'string')
      return { name: 'Additional', tags }
    }
    const tags = data.filter(tag => typeof tag === 'string' && tag.split('/')[0] === group)
    return { name: group, tags }
  })
  return groupedTags
}

const Tags = ({ currentProduct, toggleTag }) => (
  <Container>
    {getGroupedTags(data).map(group => (
      <GroupContainer key={group.name}>
        <Title>{group.name}</Title>
        {group.tags.map(tag => (
          <Tag currentProduct={currentProduct} key={tag} onClick={toggleTag} tag={tag} />
        ))}
      </GroupContainer>
    ))}
  </Container>
)

export default Tags
