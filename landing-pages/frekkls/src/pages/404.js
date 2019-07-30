import React from 'react'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

import Button from '../components/button'
import Layout from '../layout'
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
      <h1>{'404 - NOT FOUND'}</h1>
      <p>{"You just hit a page that doesn't exist."}</p>
      <Link to="/">
        <Button color="#f75c35">{'Go back to safety'}</Button>
      </Link>
    </Section>
  </Layout>
))`
  ${Section} {
    justify-content: center;
    min-height: calc(100vh - 150px);
    padding-top: 3vw;
    padding-bottom: 3vw;
  }
  h1 {
    font-size: 4vw;
    line-height: 2;
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
