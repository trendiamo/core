import React from 'react'
import { graphql } from 'gatsby'

import Buzz from '../sections/buzz'
import Depth from '../sections/depth'
import FeaturesHero from '../sections/features-hero'
import Layout from '../components/layout'

const FeaturesPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <FeaturesHero featuresHero={data.featuresHero} />
    <Depth depth={data.depth} />
    <Buzz layout={data.layout} />
  </Layout>
)

export default FeaturesPage

export const query = graphql`
  query FeaturesPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    featuresHero: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      featuresHeroHeading
      featuresHeroSubHeading {
        featuresHeroSubHeading
      }
    }
    depth: contentfulFeaturesPage(name: { eq: "Features" }, node_locale: { eq: $locale }) {
      feature1Heading
      feature1Text
      feature2Heading
      feature2Text
      feature3Heading
      feature3Text
    }
  }
`
