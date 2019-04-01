import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
`

const StyledFeatureCard = styled.div`
  flex: 1;
  max-width: 450px;
  text-align: left;
  padding: 10px;
  margin: 20px 0px;
  background-color: #fff;

  img {
    object-fit: contain;
    width: 100%;
  }

  h1 {
    font-size: 30px;
    font-weight: normal;
    margin: 20px 10px 30px 10px;
  }

  &:hover {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.16);
  }

  @media (min-width: 700px) {
    margin: 0px 20px;
  }
`

const MetaImg = styled.img`
  width: 100%;
  border-radius: 100%;
  padding: 2px;
  margin-right: 10px;
`

const MetaAuthor = styled.div`
  font-size: 0.8em;
  font-weight: 700;
  padding-top: 14px;
`

const MetaDate = styled.div`
  font-size: 0.8em;
  color: #959595;
  padding-top: 4px;
`

const ImageContainer = styled.div`
  width: 100%;
`

const DetailsContainer = styled.div`
  display: flex;
`

const WrittenDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const AvatarContainer = styled.div`
  width: 60px;
  margin-right: 10px;
  margin-left: 10px;
`

const BlogPostCard = ({ to, imagesData, post }) => (
  <StyledLink to={to}>
    <StyledFeatureCard>
      <ImageContainer>
        <img alt="" src={imagesData.titleImage.fixed.src} />
      </ImageContainer>
      <h1>{post.title}</h1>
      <DetailsContainer>
        <AvatarContainer>
          <MetaImg src={post.authorImage.fixed.src} />
        </AvatarContainer>
        <WrittenDetails>
          <MetaAuthor>{post.authorName}</MetaAuthor>
          <MetaDate>{post.publishingDate}</MetaDate>
        </WrittenDetails>
      </DetailsContainer>
    </StyledFeatureCard>
  </StyledLink>
)

export default BlogPostCard
