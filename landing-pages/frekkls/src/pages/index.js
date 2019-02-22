import React from 'react'
import { graphql } from 'gatsby'

import Ads from '../sections/ads'
import Buzz from '../sections/buzz'
import Depth from '../sections/depth'
import Hero from '../sections/hero'
import Layout from '../components/layout'
import RecentBlog from '../sections/recent-blog'
import TopCta from '../sections/top-cta'

const IndexPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <Hero hero={data.hero} />
    <TopCta topCta={data.topCta} />
    <Ads ads={data.ads} />
    <Depth depth={data.depth} />
    <RecentBlog blogPost={data.recentBlogs.edges[0].node} locale={pageContext.locale} />
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
    ads: contentfulHomepage(name: { eq: "Homepage-v2" }, node_locale: { eq: $locale }) {
      adsHeading
      adsSubHeading
      adsText {
        adsText
      }
      adsCta
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
    recentBlogs: allContentfulBlogPost(
      limit: 1
      sort: { fields: publishingDate }
      filter: { node_locale: { eq: "en-US" } }
    ) {
      edges {
        node {
          title
          titleImage {
            fixed(width: 1280) {
              src
            }
          }
          cardCta
        }
      }
    }
  }
`
