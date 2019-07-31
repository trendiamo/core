import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from '../components/button'
import EmailCta from '../components/email-cta'
import Section from '../components/section'
import { blogPostUrl } from '../utils'

const HeroBlog = styled.div`
  width: 100vw;
  position: relative;
`

const HeroBlogContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-image: linear-gradient(rgba(0, 0, 0, 0.4), transparent calc(2rem + 4px + 3.1vw));
  padding: 90px 4vw;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  a {
    text-decoration: none;
  }

  h3 {
    color: #fff;
    opacity: 0.8;
    line-height: 1;
    font-size: 19px;
    text-transform: uppercase;
    margin: 0;
    font-weight: normal;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  h2 {
    color: #fff;
    font-size: 5vw;
    line-height: 1.2;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  @media (min-width: 900px) {
    h2 {
      max-width: 50%;
      font-size: 4vw;
    }
  }
`

const HeroBlogImage = styled(Img)`
  min-height: 600px;
  max-height: calc(100vh - 10vw);
`

const BlogHero = styled(({ blogHero, className }) => (
  <Section className={className}>
    <HeroBlog>
      <HeroBlogImage fluid={blogHero.titleImage.fluid} />
      <HeroBlogContent>
        <h3>{blogHero.categories[0].name}</h3>
        <Link to={blogPostUrl(blogHero)}>
          <h2>{blogHero.title}</h2>
        </Link>
        <Link to={blogPostUrl(blogHero)}>
          <Button color="#fff">{'Read More'}</Button>
        </Link>
      </HeroBlogContent>
    </HeroBlog>
    <EmailCta />
  </Section>
))`
  min-height: unset;
`

export default BlogHero
