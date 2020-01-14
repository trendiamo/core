import Layout from '../layout'
import OpeningCounter from '../sections/opening-counter'
import React from 'react'
import SignupSuccessHero from '../sections/signup-success-hero'
import { graphql } from 'gatsby'

const NewsletterSignupSuccess = ({ data }) => (
  <Layout
    data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}
    hideNewsletter
  >
    <SignupSuccessHero />
    <OpeningCounter />
  </Layout>
)

export const query = graphql`
  query NewsletterSignupSuccess {
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

export default NewsletterSignupSuccess
