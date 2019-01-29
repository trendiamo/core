import React from 'react'
import { graphql } from 'gatsby'

import BlogPost from '../components/blog-post'
import Container from '../components/container'
import Layout from '../components/layout'
import Section from '../components/section'

const BlogPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <Section>
      <Container>
        {data.blogs.edges.map(e => (
          <BlogPost key={e.node.id} post={e.node} />
        ))}
      </Container>
    </Section>
  </Layout>
)

export default BlogPage

export const query = graphql`
  query BlogPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    blogs: allContentfulBlogPost(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          secondaryTitle
          authorImage {
            fixed {
              src
            }
          }
          authorName
          publishingDate
          titleImage {
            fixed(width: 1280) {
              src
            }
          }
          titleImageCredit {
            childContentfulRichText {
              html
            }
          }
          text {
            childContentfulRichText {
              html
            }
          }
        }
      }
    }
  }
`
