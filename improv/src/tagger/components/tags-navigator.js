import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`

const Tab = styled.div`
  padding: 2px 12px;
  background: #eeece6;
  cursor: pointer;
  text-align: center;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #b3a87d;
  color: #333;
  flex: 1;
  margin-left: 2px;
  &:hover {
    ${({ active }) => !active && 'background: #dddbd0;'}
  }
  ${({ active }) => active && 'background: #fb0; color: #fff;'}
`

const TagsNavigator = ({ tagGroupIndex, setTagGroupIndex, tagsMatrix }) => (
  <Container>
    {tagsMatrix.map((val, key) => (
      <Tab active={key === tagGroupIndex} key={val} onClick={() => setTagGroupIndex(key)}>
        {key + 1}
      </Tab>
    ))}
  </Container>
)

export default TagsNavigator
