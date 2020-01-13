import React from 'react'
import { graphql } from 'gatsby'

import Hero from '../sections/about-us/hero'
import Interested from '../sections/about-us/interested'
import Layout from '../layout'
import MainImages from '../sections/about-us/main-images'
import MeetTheBand from '../sections/about-us/meet-the-band'
import MiddleImage from '../sections/about-us/middle-image'
import OurValues from '../sections/about-us/our-values'
import StrongVision from '../sections/about-us/strong-vision'

const IndexPage = ({ data }) => (
  <Layout data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}>
    <Hero />
    <MainImages />
    <StrongVision />
    <MiddleImage />
    <MeetTheBand />
    <OurValues />
    <Interested />
  </Layout>
)

export const query = graphql`
  query AboutUsPage {
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
