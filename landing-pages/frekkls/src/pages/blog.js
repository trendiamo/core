import React from 'react'
import { graphql } from 'gatsby'

import BlogPostCard from '../components/blog-post-card'
import blogPostUrl from '../utils/index.js'
import Container from '../components/container'
import Layout from '../components/layout'
import Section from '../components/section'
import { FeatureCards } from '../components/cards'

const BlogPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <Section>
      <Container>
        <FeatureCards>
          {data.blogs.edges.map((blog, index) => (
            <BlogPostCard
              imagesData={data.imagesData.edges[index].node}
              key={blog.node.id}
              post={blog.node}
              to={blogPostUrl(blog.node, pageContext.locale)}
            />
          ))}
        </FeatureCards>
      </Container>
    </Section>
  </Layout>
)

export default BlogPage

export const query = graphql`
  query BlogPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    imagesData: allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
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
          slug
          secondaryTitle
          cardCta
        }
      }
    }
  }
`
