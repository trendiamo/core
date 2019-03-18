import Layout from '../components/layout'
import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Seo from './seo'
import { FacebookLink, InstagramLink, TwitterLink, YoutubeLink } from './social-media-icons'

const MetaImg = styled.img`
  margin-top: 10px;
  object-fit: cover;
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  padding: 2px;
  margin-right: 10px;
`

const MetaAuthor = styled.div`
  font-size: 0.8em;
  font-weight: 700;
  padding-top: 16px;
`

const MetaDate = styled.div`
  font-size: 0.8em;
  color: #a5a5a5;
`

const HeaderImg = styled.div`
  position: relative;
  padding: 200px 0px;
  background-color: #000;
  background-image: linear-gradient(95deg, rgba(14, 13, 13, 0.7), rgba(255, 139, 100, 0.6)), url(${({ src }) => src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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

const BlogPostBase = styled.article`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  padding-bottom: 3rem;
  line-height: 1.58;
  letter-spacing: -0.3px;

  h1 {
    font-family: Roboto Slab, sans-serif;
    font-size: 30px;
    line-height: 1.3em;
    margin-top: 40px;
  }

  h2 {
    font-size: 20px;
    margin-top: 14px;
  }

  a {
    color: inherit;
  }

  @media (min-width: 600px) {
    width: 70%;
    h1 {
      font-size: 2em;
      margin-top: 40px;
    }

    h2 {
      font-size: 24px;
    }
  }

  @media (min-width: 900px) {
    h1 {
      margin-top: 0px;
    }
  }
`

const BlogText = styled.div`
  p {
    margin-top: 30px;
    font-family: Roboto Slab, sans-serif;
    color: #333;
    font-size: 16px;
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
`

const DetailsContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  border-bottom: 1px solid black;

  @media (min-width: 700px) {
    border: none;
  }
`

const MetaDetailsContainer = styled.div`
  width: 100%;
  padding-bottom: 6px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 700px) {
    border-bottom: 1px solid black;
    flex-direction: row;
    padding-bottom: 16px;
  }
`

const SocialMediaLinks = styled.div`
  padding-top: 4px;
  margin-left: -10px;
  @media (min-width: 700px) {
    padding-top: 30px;
    align-self: flex-end;
    flex-direction: row;
  }
`

const ArticleDetails = ({ pageContext }) => (
  <DetailsContainer>
    <MetaImg src={pageContext.post.node.authorImage.fixed.src} />
    <MetaDetailsContainer>
      <div>
        <MetaAuthor>{pageContext.post.node.authorName}</MetaAuthor>
        <MetaDate>{pageContext.post.node.publishingDate}</MetaDate>
      </div>
      <SocialMediaLinks>
        <FacebookLink />
        <InstagramLink />
        <TwitterLink />
        <YoutubeLink />
      </SocialMediaLinks>
    </MetaDetailsContainer>
  </DetailsContainer>
)

const BlogPost = ({ pageContext, data }) => (
  <Layout layout={data.layout} locale={pageContext.locale}>
    <Seo
      description={pageContext.post.node.description.description}
      imageSrc={pageContext.post.node.titleImage.fixed.src}
      keywords={pageContext.post.node.keywords}
      lang={pageContext.locale}
      meta={[]}
      title={pageContext.post.node.title}
    />
    <HeaderImg src={pageContext.post.node.titleImage.fixed.src} />
    <TitleImgMeta
      dangerouslySetInnerHTML={{
        __html: pageContext.post.node.titleImageCredit.childContentfulRichText.html,
      }}
    />
    <BlogPostBase>
      <h1>{pageContext.post.node.title}</h1>
      <h2>{pageContext.post.node.secondaryTitle}</h2>
      <ArticleDetails pageContext={pageContext} />
      <BlogText
        className="blog-text"
        dangerouslySetInnerHTML={{
          __html: pageContext.post.node.text.childContentfulRichText.html,
        }}
      />
    </BlogPostBase>
  </Layout>
)

export default BlogPost

export const query = graphql`
  query BlogPost($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
  }
`
