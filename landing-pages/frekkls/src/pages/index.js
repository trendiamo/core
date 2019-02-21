import React from 'react'
import { graphql } from 'gatsby'

import Buzz from '../sections/buzz'
import Depth from '../sections/depth'
import Hero from '../sections/hero'
import Layout from '../components/layout'
import TopCta from '../sections/top-cta'

const IndexPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <Hero hero={data.hero} />
    <TopCta topCta={data.topCta} />
    <Depth depth={data.depth} />
    <Buzz layout={data.layout} />
  </Layout>
)

export default IndexPage

export const query = graphql`
  query Homepage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    hero: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      openerHeading
      openerSubHeading
      openerEmailLabel
      openerEmailCta
    }
    topCta: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      signupHeading
      signupSubHeading
    }
    depth: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      featuresHeading
      featuresSubText
      feature1Pill
      feature1Heading
      feature1Text
      feature1Cta
      feature2Pill
      feature2Heading
      feature2Text
      feature2Cta
      feature3Pill
      feature3Heading
      feature3Text
      feature3Cta
    }
  }
`
