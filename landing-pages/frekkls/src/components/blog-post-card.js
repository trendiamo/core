import React from 'react'
import styled from 'styled-components'
import { FeatureButton } from '../components/button'
import { FeatureCard } from '../components/cards'
import { Link } from 'gatsby'

const StyledFeatureCard = styled(FeatureCard)`
  width: 300px;
  height: 480px;
  @media (min-width: 900px) {
    width: 450px;
    height: 580px;
  }
`

const BlogPostCard = ({ to, imagesData, post }) => (
  <StyledFeatureCard>
    <img alt="" src={imagesData.titleImage.fixed.src} />
    <h1>{post.title}</h1>
    <p>{post.secondaryTitle}</p>
    <Link to={to}>
      <FeatureButton>{post.cardCta}</FeatureButton>
    </Link>
  </StyledFeatureCard>
)

export default BlogPostCard
