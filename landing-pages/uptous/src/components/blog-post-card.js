import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import { blogPostUrl } from '../utils'
import { Link } from 'gatsby'

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  text-decoration: none;
`

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 450px;
  text-align: left;
  padding: 10px;
  margin: 20px 0px;
  background-color: #fff;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  h2 {
    font-size: 30px;
    line-height: 1.2;
    font-weight: normal;
    margin: 20px 10px 20px 10px;
  }
  h2 + div {
    margin: 0 10px;
    font-size: 18px;
    line-height: 1.4;
  }
  @media (min-width: 700px) {
    margin: 0px 20px;
  }
`

const ImageContainer = styled.div`
  width: 100%;
`

const BlogPostCard = ({ post }) => (
  <StyledLink to={blogPostUrl(post)}>
    <FeatureCard>
      <ImageContainer>
        <Img alt="" fluid={{ ...post.titleImage.fluid, aspectRatio: 1.5 }} />
      </ImageContainer>
      <h2>{post.title}</h2>
      <div>
        {post.description.description} <u>{'Read\u00A0more'}</u>
      </div>
    </FeatureCard>
  </StyledLink>
)

export default BlogPostCard
