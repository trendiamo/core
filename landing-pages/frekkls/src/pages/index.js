import React from 'react'
import { graphql } from 'gatsby'

import Future from '../sections/future'
import Hero from '../sections/hero'
import How from '../sections/how'
import Layout from '../layout'
import Pricing from '../sections/pricing'
import SocialProof from '../sections/social-proof'
import Visuals from '../sections/visuals'
import What from '../sections/what'

const headerLinks = [
  { text: 'Magazine', target: '/magazine' },
  { text: 'What you get', target: '#what-you-get' },
  { text: 'Product', target: '#product' },
  { text: 'Pricing', target: '#pricing' },
]

const IndexPage = ({ data }) => (
  <Layout
    blogCategories={data.blogCategories}
    hasGetStarted
    headerColorScheme="home"
    headerLinks={headerLinks}
    layout={data.layout}
  >
    <Hero />
    <What />
    <How />
    <Visuals />
    <Future />
    <Pricing />
    <SocialProof />
  </Layout>
)

export const query = graphql`
  query HomePage {
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
  }
`

export default IndexPage
