import React from 'react'
import { graphql } from 'gatsby'

import BottomHeadline from '../sections/bottom-headline'
import Hero from '../sections/hero'
import Layout from '../layout'
import OpeningCounter from '../sections/opening-counter'
import OurGoals from '../sections/our-goals'

const IndexPage = ({ data }) => (
  <Layout data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}>
    <Hero data={data.hero} />
    <OpeningCounter />
    <OurGoals />
    <BottomHeadline />
  </Layout>
)

export const query = graphql`
  query HomePage {
    hero: contentfulHomepage(name: { eq: "Homepage" }) {
      heroHeading
      heroSubheading
    }
    termsAndConditions: contentfulModalText(name: { eq: "Terms and Conditions" }) {
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
