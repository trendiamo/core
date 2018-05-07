import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: relative;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  margin-bottom: 2rem;
`

const CoverPic = styled.div`
  position: relative;
  height: 240px;
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl});
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 -66px 40px -40px #fff;
`

const ProfilePic = styled.img`
  position: absolute;
  bottom: 15px;
  left: 15px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.7rem;
`

const Title = styled.div`
  position: absolute;
  left: 110px;
  bottom: 0;
  font-weight: 700;
  color: black;
  font-size: 20px;
`

const Description = styled.div`
  padding: 6px 15px 15px 110px;
  font-size: 14px;
  font-weight: 500;
`

const Cover = ({ collection }) => (
  <StyledDiv>
    <CoverPic backgroundImageUrl={collection.coverPicUrl}>
      <Title>{collection.title}</Title>
    </CoverPic>
    <ProfilePic src={collection.profilePicUrl} />
    <Description>{collection.description}</Description>
  </StyledDiv>
)

export default Cover
