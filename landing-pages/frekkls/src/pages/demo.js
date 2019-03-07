import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import BgWaveGrey from '../images/bg-wave-grey.svg'
import Buzz from '../sections/buzz'
import DemoAdLink from '../sections/demo-ad-link'
import DemoBioLink from '../sections/demo-bio-link'
import DemoOrganic from '../sections/demo-organic'
import Layout from '../components/layout'
import TopCta from '../sections/top-cta'

const DemoPage = styled(({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <DemoBioLink demoBioLink={data.demoBioLink} />
    <DemoAdLink demoAdLink={data.demoAdLink} />
    <DemoOrganic demoOrganic={data.demoOrganic} />
    <Buzz BgWaveGrey={BgWaveGrey} layout={data.layout} />
  </Layout>
))`
  ${TopCta} {
    margin-bottom: 100px;
  }
`

export default DemoPage

export const query = graphql`
  query DemoPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    demoBioLink: contentfulDemoPage(name: { eq: "Demo Page-v2" }, node_locale: { eq: $locale }) {
      card1Heading {
        childContentfulRichText {
          html
        }
      }
      card1DemoEntryUrl
      card1Image {
        fluid {
          src
        }
      }
      card1Text
      card1CtaMd {
        childContentfulRichText {
          html
        }
      }
    }
    demoAdLink: contentfulDemoPage(name: { eq: "Demo Page-v2" }, node_locale: { eq: $locale }) {
      card2Heading {
        childContentfulRichText {
          html
        }
      }
      card2DemoEntryUrl
      card2Image {
        fluid {
          src
        }
      }
      card2Text
      card2CtaMd {
        childContentfulRichText {
          html
        }
      }
    }
    demoOrganic: contentfulDemoPage(name: { eq: "Demo Page-v2" }, node_locale: { eq: $locale }) {
      card3Heading {
        childContentfulRichText {
          html
        }
      }
      card3DemoEntryUrl
      card3Image {
        fluid {
          src
        }
      }
      card3Text
      card3CtaMd {
        childContentfulRichText {
          html
        }
      }
    }
  }
`
