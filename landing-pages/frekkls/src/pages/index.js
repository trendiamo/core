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

const IndexPage = ({ className, data }) => (
  <Layout className={className} layout={data.layout}>
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
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: "en-US" }) {
      legalNotice {
        childContentfulRichText {
          html
        }
      }
      privacyPolicy {
        childContentfulRichText {
          html
        }
      }
      requestDemo {
        childContentfulRichText {
          html
        }
      }
    }
  }
`

export default IndexPage
