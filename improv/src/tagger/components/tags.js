import Button from 'shared/button'
import React from 'react'
import styled from 'styled-components'
import Tag from './tag'
import tagList from 'tagger/tag-list'
import { compose, withHandlers, withProps, withState } from 'recompose'

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

const getGroupedTags = ({ tagList, currentTagKey }) => {
  let groupName
  const groups = tagList
    .map(tag => {
      if (currentTagKey === tag.key) return
      const tagGroupName = typeof tag === 'string' ? tag.split('>')[0] : '_additional'
      if (!groupName || groupName !== tagGroupName) {
        groupName = tagGroupName
        return groupName
      }
    })
    .filter(e => e)
  const groupedTags = groups.map(group => {
    if (group === '_additional') {
      const tags = tagList.filter(tag => typeof tag !== 'string')
      return { name: 'Additional', tags }
    }
    const tags = tagList.filter(tag => typeof tag === 'string' && tag.split('>')[0] === group)
    return { name: group, tags }
  })
  return groupedTags
}

const BackButton = styled(Button)`
  margin-top: 20px;
`

const TagsContainer = ({ currentProduct, currentTagList, currentTagKey, onTagClick, goBackToMainList }) => (
  <div>
    <Container>
      {currentTagList.map(group => (
        <GroupContainer key={group.name}>
          <Title>{group.name}</Title>
          {group.tags.map(tag => (
            <Tag
              currentProduct={currentProduct}
              currentTagKey={currentTagKey}
              key={tag}
              onClick={onTagClick}
              tag={tag}
            />
          ))}
        </GroupContainer>
      ))}
    </Container>
    {currentTagKey && (
      <BackButton onClick={goBackToMainList} type="button">
        {'< Back'}
      </BackButton>
    )}
  </div>
)

const Tags = compose(
  withState('currentTagKey', 'setCurrentTagKey', null),
  withProps(({ currentTagKey }) => ({
    currentTagList: getGroupedTags({ tagList, currentTagKey }),
  })),
  withHandlers({
    onTagClick: ({ currentTagKey, setCurrentTagKey, toggleTag }) => tag => {
      if (tag.splitByTags) {
        setCurrentTagKey(tag.key)
      } else {
        if (currentTagKey) {
          const newTag = { key: currentTagKey, splitByTags: true, tag }
          return toggleTag(newTag)
        }
        toggleTag(tag)
      }
    },
    goBackToMainList: ({ setCurrentTagKey }) => () => {
      setCurrentTagKey(null)
    },
  })
)(TagsContainer)

export default Tags
