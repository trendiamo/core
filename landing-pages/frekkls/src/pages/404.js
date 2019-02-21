import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

const NotFoundPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <h1>{'NOT FOUND'}</h1>
    <p>{"You just hit a page that doesn't exist..."}</p>
  </Layout>
)

export default NotFoundPage

export const query = graphql`
  query NotFoundPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
  }
`
