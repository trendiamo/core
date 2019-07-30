import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Button from '../components/button'
import Layout from '../layout'
import NotFoundImg from '../images/not-found'
import Section from '../components/section'
import Seo from '../layout/seo'

const NotFoundPage = styled(({ className, data }) => (
  <Layout
    blogCategories={data.blogCategories}
    className={className}
    headerColorScheme="black-on-white"
    layout={data.layout}
  >
    <Section>
      <Seo title="Frekkls - 404 Not Found" />
      <NotFoundImg alt="404 - Not Found" />
      <h1>{'Oops!'}</h1>
      <p>{'Looks like the page you are looking for does not exist or the link you used is broken 😐'}</p>
      <Link to="/">
        <Button color="#f75c35">{'Take me home'}</Button>
      </Link>
    </Section>
  </Layout>
))`
  ${Section} {
    margin-top: calc(2rem + 4px + 3.1vw);
    justify-content: center;
    min-height: calc(100vh - 150px);
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  ${Section} > .gatsby-image-wrapper {
    width: 80vw;
    max-width: 400px;
  }
  ${Section} > h1 {
    font-size: 30px;
    line-height: 2;
    font-weight: bold;
    color: #f75c35;
  }
  ${Section} > p {
    font-size: 20px;
    color: #999;
    margin-bottom: 28px;
    text-align: center;
    max-width: 80vw;
  }

  @media (min-width: 900px) {
    ${Section} > h1 {
      font-size: calc(8px + 2.5vw);
    }
    ${Section} > p {
      font-size: calc(9px + 1.25vw);
      max-width: 45vw;
    }
  }
`

export const query = graphql`
  query NotFoundPage {
    layout: contentfulLayout(name: { eq: "Layout-v2" }) {
      ...Layout
    }
    blogCategories: allContentfulBlogCategory {
      edges {
        node {
          name
          slug
        }
      }
    }
  }
`

export default NotFoundPage
