import React from 'react'
import { graphql } from 'gatsby'

import BlogHero from '../sections/blog-hero'
import BlogPostCard from '../components/blog-post-card'
import BlogPostCardContainer from '../components/blog-post-card-container'
import Layout from '../layout'
import Section from '../components/section'
import Seo from '../layout/seo'

const BlogPage = ({ data }) => (
  <Layout data={{ legalNotice: data.legalNotice.text, privacyPolicy: data.privacyPolicy.text }} whiteLogo>
    <Seo title="Uptous Magazine" />
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
  </Layout>
)

export const query = graphql`
  query BlogPage {
    legalNotice: contentfulModalText(name: { eq: "Legal Notice" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    privacyPolicy: contentfulModalText(name: { eq: "Privacy Policy" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    blogPage: contentfulBlogPage {
      featuredBig {
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
