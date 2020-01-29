import Helmet from 'react-helmet'
import React from 'react'
import TitleImage from '../images/metaimg.jpg'
import { graphql, useStaticQuery } from 'gatsby'

const seoQuery = graphql`
  query SEOQuery {
    site: contentfulObject(name: { eq: "Meta Data" }) {
      value {
        title
        description
        author
        lang
      }
    }
  }
`

const computeMeta = ({ dataSeo = {} }) =>
  [
    { content: dataSeo.description, name: 'description' },
    { content: dataSeo.title, property: 'og:title' },
    { content: dataSeo.description, property: 'og:description' },
    { content: 'website', property: 'og:type' },
    { content: dataSeo.image, property: 'og:image' },
    { content: 'summary', name: 'twitter:card' },
    { content: dataSeo.author, name: 'twitter:creator' },
    { content: dataSeo.title, name: 'twitter:title' },
    { content: dataSeo.description, name: 'twitter:description' },
  ].concat(
    dataSeo.keywords && dataSeo.keywords.length > 0 ? { content: dataSeo.keywords.join(', '), name: 'keywords' } : []
  )

const Seo = ({ dataSeo = {} }) => {
  const data = useStaticQuery(seoQuery)
  const htmlAttributes = { lang: data.site.value.lang }
  const meta = computeMeta({
    dataSeo: {
      author: data.site.value.author,
      description: dataSeo.description || data.site.value.description,
      image: dataSeo.imageSrc || TitleImage,
      keywords: dataSeo.keywords || [],
      title: dataSeo.title || data.site.value.title,
    },
  })

  return (
    <Helmet
      htmlAttributes={htmlAttributes}
      keywords={dataSeo.keywords}
      meta={meta}
      title={dataSeo.title || data.site.value.title}
    />
  )
}

export default Seo
