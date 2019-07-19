import Helmet from 'react-helmet'
import React from 'react'
import TitleImage from '../images/title-image.jpg'
import { graphql, StaticQuery } from 'gatsby'

const Seo = ({ description, meta, keywords, title }) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || data.site.siteMetadata.description
      return (
        <Helmet
          htmlAttributes={{
            lang: data.site.siteMetadata.lang,
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
              content: TitleImage,
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
            .concat(meta || [])}
          title={title || `Frekkls - ${data.site.siteMetadata.title}`}
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
