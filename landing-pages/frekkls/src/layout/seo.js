import Helmet from 'react-helmet'
import React from 'react'
import TitleImage from '../images/title-image.jpg'
import { graphql, useStaticQuery } from 'gatsby'

const seoQuery = graphql`
  query SEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        lang
      }
    }
  }
`

const computeMeta = ({ author, description, image, keywords, title }) =>
  [
    { content: description, name: 'description' },
    { content: title, property: 'og:title' },
    { content: description, property: 'og:description' },
    { content: 'website', property: 'og:type' },
    { content: image, property: 'og:image' },
    { content: 'summary', name: 'twitter:card' },
    { content: author, name: 'twitter:creator' },
    { content: title, name: 'twitter:title' },
    { content: description, name: 'twitter:description' },
  ].concat(keywords.length > 0 ? { content: keywords.join(', '), name: 'keywords' } : [])

const Seo = ({ description, imageSrc, keywords, title }) => {
  const data = useStaticQuery(seoQuery)
  const htmlAttributes = { lang: data.site.siteMetadata.lang }
  const meta = computeMeta({
    author: data.site.siteMetadata.author,
    description: description || data.site.siteMetadata.description,
    image: imageSrc || TitleImage,
    keywords: keywords || [],
    title: title || data.site.siteMetadata.title,
  })

  return (
    <Helmet
      htmlAttributes={htmlAttributes}
      keywords={keywords}
      meta={meta}
      title={title || data.site.siteMetadata.title}
    />
  )
}

export default Seo
