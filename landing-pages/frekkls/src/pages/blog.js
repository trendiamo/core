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
        {data.blogs.edges.map((blog, index) => (
          <BlogPost imagesData={data.imagesData.edges[index].node} key={blog.node.id} post={blog.node} />
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
    imagesData: allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          authorImage {
            fixed(width: 120) {
              src
            }
          }
          titleImage {
            fixed(width: 1280) {
              src
            }
          }
        }
      }
    }
    blogs: allContentfulBlogPost(filter: { node_locale: { eq: $locale } }) {
      edges {
        node {
          id
          title
          secondaryTitle
          authorName
          publishingDate
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
