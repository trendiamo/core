import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import blogPostUrl from '../utils/index.js'
import Container from '../components/container'
import Section from '../components/section'

const Flex = styled.div`
  @media (min-width: 900px) {
    display: flex;
    margin-left: -40px;
    margin-right: -40px;
  }
`

const Flex1 = styled.div`
  flex: 1;
  @media (min-width: 900px) {
    margin-left: 40px;
    margin-right: 40px;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`

const RecentBlog = styled(({ blogPost, className, locale }) => (
  <Section className={className}>
    <Container>
      <Flex>
        <Flex1>
          <h3>{'Blog'}</h3>
          <p>{blogPost.title}</p>
          <Link to={blogPostUrl(blogPost, locale)}>{blogPost.cardCta}</Link>
        </Flex1>
        <Flex1 />
      </Flex>
    </Container>
  </Section>
))`
  position: relative;
  padding-top: 70px;
  padding-bottom: 70px;
  background-color: #000;

  background-image: linear-gradient(120deg, rgba(20, 20, 20, 0.9) 60%, rgba(20, 20, 20, 0.4)), url('${({ blogPost }) =>
    blogPost.titleImage.fixed.src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media (min-width: 900px) {
    text-align: left;
  }

  ${Container} {
    width: 100%;
  }

  h3 {
    color: #999;
    font-weight: bold;
    letter-spacing: 1.6px;
    font-size: 19px;
    text-transform: uppercase;
  }

  p,
  a {
    color: white;
  }

  p {
    font-size: 40px;
    line-height: 1.05;
    margin-bottom: 70px;
  }

  a {
    font-size: 20px;
    letter-spacing: 0.5px;
    text-decoration: none;
    border-bottom: 1px solid #fff;
    display: inline-block;
    padding-bottom: 10px;
    align-self: baseline;
    white-space: nowrap;
  }
`

export default RecentBlog
