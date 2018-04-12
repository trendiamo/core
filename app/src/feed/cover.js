import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  position: relative;
  margin-bottom: 2rem;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.13);
  border-radius: 20px;
  height: 220px;
`

const CoverPic = styled.div`
  height: 170px;
  background-image: url(${({ backgroundImageUrl }) => backgroundImageUrl});
  background-size: cover;
  box-shadow: inset 0 -66px 40px -40px #fff;
`

const ProfilePic = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 0.7rem;
`

const AbsoluteDiv = styled.div`
  position: absolute;
  bottom: 0;
  padding: 120px 14px 14px 14px;
  display: flex;
  flex-direction: row;
  width: 100%;
`

const TitleAndDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`

const Title = styled.div`
  font-weight: 700;
  color: black;
  font-size: 20px;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`

const Description = styled.div`
  font-size: 14px;
  white-space: pre;
`

const Cover = ({ collection }) => (
  <StyledDiv>
    <CoverPic backgroundImageUrl={collection.cover_pic_url} />
    <AbsoluteDiv>
      <ProfilePic src={collection.profile_pic_url} />
      <TitleAndDescription>
        <Title>{collection.title}</Title>
        <Description>{collection.description}</Description>
      </TitleAndDescription>
    </AbsoluteDiv>
  </StyledDiv>
)

export default Cover
