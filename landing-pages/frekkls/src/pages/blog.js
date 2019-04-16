import React from 'react'
import { graphql } from 'gatsby'

import BlogHero from '../sections/blog-hero'

import BlogPostCard from '../components/blog-post-card'
import blogPostUrl from '../utils/index.js'
import Container from '../components/container'
import Layout from '../components/layout'
import Section from '../components/section'
import styled from 'styled-components'

const StyledSection = styled(Section)`
  background-color: #f2f4f7;
`

const BlogPageContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 700px) {
    align-items: center;
    flex-direction: column;
  }
`

const BlogPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <BlogHero blogHero={data.blogHero} />
    <StyledSection>
      <BlogPageContainer>
        {data.blogs.edges.map((blog, index) => (
          <BlogPostCard
            imagesData={data.imagesData.edges[index].node}
            key={blog.node.id}
            post={blog.node}
            to={blogPostUrl(blog.node, pageContext.locale)}
          />
        ))}
      </BlogPageContainer>
    </StyledSection>
  </Layout>
)

export default BlogPage

export const query = graphql`
  query BlogPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    blogHero: contentfulBlogPage(node_locale: { eq: $locale }) {
      heading
      mainText
      mainImage {
        fluid(maxWidth: 1280) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
    imagesData: allContentfulBlogPost(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          titleImage {
            fixed(width: 860) {
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
          cardCta
          authorName
          publishingDate
          authorImage {
            fixed(width: 120) {
              src
            }
          }
        }
      }
    }
  }
`
