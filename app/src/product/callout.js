import React from 'react'
import styled from 'styled-components'

const StyledA = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
`

const ProfilePic = styled.img`
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.6rem;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const Callout = ({ collection }) => (
  <StyledA href={`/collections/${collection.handle}`}>
    <ProfilePic src={collection.profile_pic_url} />
    <Title>{collection.title}</Title>
  </StyledA>
)

export default Callout
