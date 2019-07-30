import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import BlogPostCard from '../components/blog-post-card'
import BlogPostCardContainer from '../components/blog-post-card-container'
import EmailCta from '../components/email-cta'
import Layout from '../layout'
import Seo from '../layout/seo'
import SocialMediaLinks from '../components/social-media-links'
import SocialProof from '../sections/social-proof'
import { blogHeaderLinks } from '../utils'

const MetaImg = styled.img`
  object-fit: cover;
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  margin-right: 10px;
`

const MetaAuthor = styled.div`
  font-size: 0.8em;
  font-weight: 700;
`

const MetaDate = styled.div`
  font-size: 0.8em;
  color: #959595;
`

const HeaderImg = styled.div`
  position: relative;
  padding: 200px 0px;
  background-color: #000;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), transparent calc(2rem + 4px + 3.1vw)), url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  h1 {
    color: #fff;
    font-size: 2.5rem;
    line-height: 1.2em;
    text-align: center;
    padding: 0 30px;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  @media (min-width: 900px) {
    h1 {
      font-size: 5vw;
      padding: 0 25vw;
      line-height: 1.4em;
    }
  }
`

const TitleImgMeta = styled.div`
  display: none;
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  margin-left: 10px;
  padding-top: 10px;
  @media (min-width: 900px) {
    display: block;
  }
`

const MainContent = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding-bottom: 3rem;
  line-height: 1.58;
  letter-spacing: -0.3px;
  a {
    color: inherit;
  }
  @media (min-width: 600px) {
    width: 70%;
  }
`

const BlogText = styled.div`
  h2,
  h3 {
    font-weight: 500;
    line-height: 1.3;
    text-transform: none;
    margin: 0;
    margin-bottom: 0.75rem;
    color: #2a3039;
  }
  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 25px;
  }
  p {
    margin-bottom: 1.5rem;
    font-family: Roboto Slab, sans-serif;
    color: #2d2f31;
    font-size: 18px;
  }
  li p {
    margin-bottom: 0;
    display: inline;
  }
  img {
    width: 100%;
  }
  img + p {
    font-size: 12px;
    text-transform: uppercase;
    padding-top: 10px;
  }
  @media (min-width: 700px) {
    font-size: 20px;
  }
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  ul,
  ol {
    margin-bottom: 1.5rem;
    list-style-position: inside;
  }
  ul {
    list-style-type: initial;
  }
  ol {
    list-style-type: decimal;
  }
`

const DetailsContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
  align-items: center;
`

// const MetaDetailsContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   flex-direction: row;
// `

const Meta = styled.div`
  flex: 1;
`

const TopSocialMediaLinks = styled(SocialMediaLinks)`
  display: none;
  @media (min-width: 900px) {
    display: flex;
  }
`

const BottomSocialMediaLinks = styled(SocialMediaLinks)`
  margin-bottom: 4rem;
`

const ArticleDetails = ({ location, pageContext }) => (
  <DetailsContainer>
    <MetaImg src={pageContext.post.authorImage.fixed.src} />
    <Meta>
      <MetaAuthor>{pageContext.post.authorName}</MetaAuthor>
      <MetaDate>{pageContext.post.publishingDate}</MetaDate>
    </Meta>
    <TopSocialMediaLinks location={location} />
  </DetailsContainer>
)

const RelatedPosts = styled.div`
  > h2 {
    text-align: center;
    font-size: 3vw;
    line-height: 2;
  }
`

const Hr = styled.hr`
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid black;
`

const BlogPost = ({ location, pageContext, data }) => (
  <Layout
    blogCategories={data.blogCategories}
    hasGetStarted
    headerColorScheme="white-on-black"
    headerLinks={blogHeaderLinks(data.blogCategories.edges.map(e => e.node))}
    layout={data.layout}
  >
    <Seo
      description={pageContext.post.description.description}
      imageSrc={pageContext.post.titleImage.fixed.src}
      keywords={pageContext.post.keywords}
      title={pageContext.post.title}
    />
    <article>
      <HeaderImg src={pageContext.post.titleImage.fixed.src}>
        <h1>{pageContext.post.title}</h1>
      </HeaderImg>
      <TitleImgMeta
        dangerouslySetInnerHTML={{
          __html: pageContext.post.titleImageCredit.childContentfulRichText.html,
        }}
      />
      <MainContent>
        <ArticleDetails location={location} pageContext={pageContext} />
        <BlogText
          className="blog-text"
          dangerouslySetInnerHTML={{
            __html: pageContext.post.text.childContentfulRichText.html,
          }}
        />
      </MainContent>
    </article>
    <BottomSocialMediaLinks location={location} />
    <Hr />
    <EmailCta />
    <Hr />
    <RelatedPosts>
      <h2>{'Related Articles'}</h2>
      <BlogPostCardContainer>
        {data.relatedPosts.edges.map(post => (
          <BlogPostCard key={post.node.id} post={post.node} />
        ))}
      </BlogPostCardContainer>
    </RelatedPosts>
    <SocialProof />
  </Layout>
)

export const query = graphql`
  query BlogPost($categorySlugs: [String], $slug: String) {
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
    relatedPosts: allContentfulBlogPost(
      filter: { slug: { ne: $slug }, categories: { elemMatch: { slug: { in: $categorySlugs } } } }
      sort: { fields: publishingDate, order: DESC }
      limit: 3
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

export default BlogPost
