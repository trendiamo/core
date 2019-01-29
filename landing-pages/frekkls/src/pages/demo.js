import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import DemoHero from '../sections/demo-hero'
import Layout from '../components/layout'
import TopCta from '../sections/top-cta'

const DemoPage = styled(({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <DemoHero demoHero={data.demoHero} />
    <TopCta topCta={data.topCta} />
  </Layout>
))`
  ${TopCta} {
    margin-bottom: 100px;
  }
`

export default DemoPage

export const query = graphql`
  query DemoPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    demoHero: contentfulDemoPage(name: { eq: "Demo Page" }, node_locale: { eq: $locale }) {
      pageHeading
      pageSubHeading
      card1Image {
        fixed(width: 600) {
          src
        }
      }
      card1Heading {
        childContentfulRichText {
          html
        }
      }
      card1Text
      card1Cta
      card2Image {
        fixed(width: 600) {
          src
        }
      }
      card2Heading {
        childContentfulRichText {
          html
        }
      }
      card2Text
      card2Cta
      card3Image {
        fixed(width: 600) {
          src
        }
      }
      card3Heading {
        childContentfulRichText {
          html
        }
      }
      card3Text
      card3Cta
    }
    topCta: contentfulDemoPage(name: { eq: "Demo Page" }, node_locale: { eq: $locale }) {
      signupHeading
      signupSubHeading
    }
  }
`
