import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../layout'
import MissionVision from '../sections/mission-vision'
import PledgeCta from '../sections/pledge-cta'
import PledgeHero from '../sections/pledge-hero'
import PledgeSocialProof from '../sections/pledge-social-proof'
import Podcast from '../sections/podcast'
import Seo from '../layout/seo'
import Values from '../sections/values'

const PledgePage = ({ data }) => (
  <Layout data={{ legalNotice: data.legalNotice.text, privacyPolicy: data.privacyPolicy.text }} whiteLogo>
    <Seo title="Uptous Pledge" />
    <PledgeHero />
    <MissionVision />
    <Podcast />
    <Values />
    <PledgeCta />
    <PledgeSocialProof />
  </Layout>
)

export const query = graphql`
  query BlogPage {
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

export default PledgePage
