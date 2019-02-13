import React from 'react'
import styled from 'styled-components'
import { FeatureButton } from '../components/button'
import { FeatureCard } from '../components/cards'
import { Link } from 'gatsby'

const StyledFeatureButton = styled(FeatureCard)`
  overflow: hidden;
`

const Styledlink = styled(Link)`
  align-self: center;
`

const BlogPostCard = ({ to, imagesData, post }) => (
  <StyledFeatureButton>
    <img alt="" src={imagesData.titleImage.fixed.src} />
    <h1>{post.title}</h1>
    <p>{post.secondaryTitle}</p>
    <Styledlink to={to}>
      <FeatureButton>{post.cardCta}</FeatureButton>
    </Styledlink>
  </StyledFeatureButton>
)

export default BlogPostCard
