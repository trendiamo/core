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
  <Layout
    data={{
      legalNotice: data.legalNotice.text,
      privacyPolicy: data.privacyPolicy.text,
      brandFormIntro: data.brandFormIntro.text,
      influencerFormIntro: data.influencerFormIntro.text,
      getInTouchFormIntro: data.getInTouchFormIntro.text,
    }}
  >
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
    brandFormIntro: contentfulModalText(name: { eq: "Brand Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    influencerFormIntro: contentfulModalText(name: { eq: "Influencer Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
    getInTouchFormIntro: contentfulModalText(name: { eq: "Get In Touch Form Intro" }) {
      text {
        childContentfulRichText {
          html
        }
      }
    }
  }
`

export default IndexPage
