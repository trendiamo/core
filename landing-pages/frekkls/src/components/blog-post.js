import Layout from '../components/layout'
import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Seo from './seo'

const MetaImg = styled.img`
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 2px solid #ff7966;
  padding: 2px;
  margin-right: 10px;
`

const MetaAuthor = styled.div`
  font-size: 0.8em;
  font-weight: 700;
  padding-top: 14px;
`

const MetaDate = styled.div`
  font-size: 0.8em;
  color: #a5a5a5;
  padding-top: 4px;
`

const TitleImg = styled.img`
  width: 100%;
  margin-top: 18px;
  border-radius: 10px;
`

const TitleImgMeta = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  padding-top: 10px;
`

const BlogPostBase = styled.div`
  width: 70%;
  margin: 0 auto;
  text-align: left;
  border-top: 2px solid #ebebeb;
  padding-top: 40px;
  line-height: 1.58;
  letter-spacing: -0.3px;

  h1 {
    font-family: Roboto Slab, sans-serif;
    font-size: 2em;
    line-height: 1.3em;
  }

  h2 {
    margin-top: 14px;
    color: #565656;
  }

  a {
    color: inherit;
  }
`

const BlogText = styled.div`
  p {
    margin-top: 30px;
    font-family: Roboto Slab, sans-serif;
    color: #333;
  }

  img {
    width: 100%;
  }

  img + p {
    font-size: 12px;
    text-transform: uppercase;
    padding-top: 10px;
  }
`

const BlogSpacer = styled.div`
  width: 50%;
  height: 2px;
  margin: 0 auto;
  margin-top: 30px;
  background: #ebebeb;
`

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
    <BlogPostBase>
      <h1>{pageContext.post.node.title}</h1>
      <h2>{pageContext.post.node.secondaryTitle}</h2>
      <div>
        <MetaImg src={pageContext.post.node.authorImage.fixed.src} />
        <MetaAuthor>{pageContext.post.node.authorName}</MetaAuthor>
        <MetaDate>{pageContext.post.node.publishingDate}</MetaDate>
      </div>
      <TitleImg alt={pageContext.post.node.description.description} src={pageContext.post.node.titleImage.fixed.src} />
      <TitleImgMeta
        dangerouslySetInnerHTML={{
          __html: pageContext.post.node.titleImageCredit.childContentfulRichText.html,
        }}
      />
      <BlogSpacer />
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
    layout: contentfulLayout(name: { eq: "Layout" }, node_locale: { eq: $locale }) {
      ...Layout
    }
  }
`
