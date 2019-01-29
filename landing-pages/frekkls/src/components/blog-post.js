import React from 'react'
import styled from 'styled-components'

const MetaImg = styled.img`
  float: left;
  width: 60px;
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

const BlogPost = ({ post }) => (
  <BlogPostBase>
    <h1>{post.title}</h1>
    <h2>{post.secondaryTitle}</h2>
    <div>
      <MetaImg src={post.authorImage.fixed.src} />
      <MetaAuthor>{post.authorName}</MetaAuthor>
      <MetaDate>{post.publishingDate}</MetaDate>
    </div>
    <TitleImg src={post.titleImage.fixed.src} />
    <TitleImgMeta dangerouslySetInnerHTML={{ __html: post.titleImageCredit.childContentfulRichText.html }} />
    <BlogSpacer />
    <BlogText className="blog-text" dangerouslySetInnerHTML={{ __html: post.text.childContentfulRichText.html }} />
  </BlogPostBase>
)

export default BlogPost
