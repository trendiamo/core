import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

import { blogPostUrl } from '../utils'
import { Link } from 'gatsby'

const FeaturedBlogPost = styled(({ className, post }) => (
  <Link className={className} to={blogPostUrl(post)}>
    <Img alt="" fluid={{ ...post.titleImage.fluid, aspectRatio: 1.5 }} />
    <div>
      <h1>{post.categories[0].name}</h1>
      <h2>{post.title}</h2>
      <div>
        {post.description.description} <u>{'Read\u00A0more'}</u>
      </div>
    </div>
  </Link>
))`
  color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  max-width: 450px;
  text-decoration: none;
  width: 100%;
  padding: 0 10px;

  h1 {
    font-size: 30px;
    margin-top: 1rem;
    margin: 1rem 10px 0 10px;
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

  @media (min-width: 900px) {
    flex-direction: row;
    max-width: unset;
    margin-bottom: 1rem;
    padding-left: 30px;
    padding-right: 30px;
    > * {
      flex: 1;
    }
    h1 {
      text-transform: uppercase;
      margin-top: 0;
      font-size: 20px;
    }
    h2 {
      font-weight: bold;
    }
  }
`

export default FeaturedBlogPost
