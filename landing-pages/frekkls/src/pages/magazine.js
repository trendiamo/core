import React from 'react'
import { graphql } from 'gatsby'

import BlogHero from '../sections/blog-hero'
import BlogPostCard from '../components/blog-post-card'
import BlogPostCardContainer from '../components/blog-post-card-container'
import Layout from '../layout'
import Section from '../components/section'
import Seo from '../layout/seo'
import SocialProof from '../sections/social-proof'
import { blogHeaderLinks } from '../utils'

const BlogPage = ({ data }) => (
  <Layout
    blogCategories={data.blogCategories}
    hasGetStarted
    headerColorScheme="white-on-black"
    headerLinks={blogHeaderLinks(data.blogCategories.edges.map(e => e.node))}
    layout={data.layout}
  >
    <Seo title="Frekkls Magazine" />
    <BlogHero blogHero={data.blogPage.featuredBig} />
    <Section>
      <BlogPostCardContainer>
        {data.blogs.edges.map(blog =>
          [data.blogPage.featuredBig.slug].includes(blog.node.slug) ? null : (
            <BlogPostCard key={blog.node.id} post={blog.node} />
          )
        )}
      </BlogPostCardContainer>
    </Section>
    <SocialProof />
  </Layout>
)

export const query = graphql`
  query BlogPage {
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
    blogPage: contentfulBlogPage {
      featuredBig {
        categories {
          name
        }
        slug
        title
        titleImage {
          fluid(quality: 100) {
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
    blogs: allContentfulBlogPost(sort: { fields: publishingDate, order: DESC }) {
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

export default BlogPage
