import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import BlogPostCard from '../components/blog-post-card'
import BlogPostCardContainer from '../components/blog-post-card-container'
import Layout from '../layout'
import Section from '../components/section'
import Seo from '../layout/seo'
import SocialProof from '../sections/social-proof'
import { blogHeaderLinks } from '../utils'

const BlogCategoryPage = styled(({ className, data, pageContext }) => (
  <Layout
    blogCategories={data.blogCategories}
    className={className}
    hasGetStarted
    headerColorScheme="black-on-white"
    headerLinks={blogHeaderLinks(data.blogCategories.edges.map(e => e.node))}
    layout={data.layout}
  >
    <Seo title={`Frekkls Magazine - ${pageContext.category.name}`} />
    <Section>
      <BlogPostCardContainer>
        {data.blogs.edges.map(blog => (
          <BlogPostCard key={blog.node.id} post={blog.node} />
        ))}
      </BlogPostCardContainer>
    </Section>
    <SocialProof />
  </Layout>
))`
  section {
    margin-top: calc(2rem + 4px + 3.1vw);
    padding-top: 3rem;
  }
`

export const query = graphql`
  query BlogCategoryPage($slug: String) {
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
    blogs: allContentfulBlogPost(
      sort: { fields: publishingDate, order: DESC }
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      edges {
        node {
          id
          description {
            description
          }
          slug
          title
          titleImage {
            fluid(maxWidth: 860) {
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    }
  }
`

export default BlogCategoryPage
