import React from 'react'
import { graphql } from 'gatsby'

import Hero from '../sections/hero'
import Layout from '../layout'
import OurBeliefs from '../sections/our-beliefs'
import OurGoals from '../sections/our-goals'
import Video from '../sections/video'
import WhatWeDo from '../sections/what-we-do'
import WhatYouGet from '../sections/what-you-get'

const IndexPage = ({ data }) => (
  <Layout data={{ legalNotice: data.legalNotice.text, privacyPolicy: data.privacyPolicy.text }}>
    <Hero data={data.hero} />
    <WhatYouGet />
    <OurBeliefs />
    <Video />
    <WhatWeDo />
    <OurGoals />
  </Layout>
)

export const query = graphql`
  query HomePage {
    hero: contentfulHomepage(name: { eq: "Homepage" }) {
      heroHeading
      heroSubheading
    }
    legalNotice: contentfulModalText(name: { eq: "Legal Notice" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    privacyPolicy: contentfulModalText(name: { eq: "Privacy Policy" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
  }
`

export default IndexPage
