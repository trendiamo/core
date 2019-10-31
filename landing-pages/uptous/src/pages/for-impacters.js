import React from 'react'
import { graphql } from 'gatsby'

import ImpactersBrands from '../sections/impacters-brands'
import ImpactersCampaign from '../sections/impacters-campaign'
import ImpactersHero from '../sections/impacters-hero'
import ImpactersInstagram from '../sections/impacters-instagram'
import Layout from '../layout'
import Seo from '../layout/seo'

const ForImpactersPage = ({ data }) => (
  <Layout data={{ legalNotice: data.legalNotice.text, privacyPolicy: data.privacyPolicy.text }} whiteLogo>
    <Seo title="For Impacters" />
    <ImpactersHero />
    <ImpactersInstagram />
    <ImpactersBrands />
    <ImpactersCampaign />
  </Layout>
)

export const query = graphql`
  query ForImpactersPage {
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

export default ForImpactersPage
