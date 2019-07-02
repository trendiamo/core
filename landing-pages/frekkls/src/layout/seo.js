import Helmet from 'react-helmet'
import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

const Seo = ({ description, lang, meta, keywords, title, imageSrc }) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || data.site.siteMetadata.description
      return (
        <Helmet
          htmlAttributes={{
            lang,
          }}
          meta={[
            {
              name: 'description',
              content: metaDescription,
            },
            {
              property: 'og:title',
              content: title || data.site.siteMetadata.title,
            },
            {
              property: 'og:description',
              content: metaDescription,
            },
            {
              property: 'og:type',
              content: 'website',
            },
            {
              property: 'og:image',
              content: imageSrc || '',
            },
            {
              name: 'twitter:card',
              content: 'summary',
            },
            {
              name: 'twitter:creator',
              content: data.site.siteMetadata.author,
            },
            {
              name: 'twitter:title',
              content: title || data.site.siteMetadata.title,
            },
            {
              name: 'twitter:description',
              content: metaDescription,
            },
          ]
            .concat(
              keywords && keywords.length > 0
                ? {
                    name: 'keywords',
                    content: keywords.join(', '),
                  }
                : []
            )
            .concat(meta)}
          title={title}
        />
      )
    }}
  />
)

export default Seo

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`