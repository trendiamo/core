import Layout from '../layout'
import OpeningCounter from '../sections/opening-counter'
import React from 'react'
import SignupSuccessHero from '../sections/signup-success-hero'
import { graphql } from 'gatsby'

const NewsletterSignupSuccess = ({ data }) => (
  <Layout data={data} hideNewsletter>
    <SignupSuccessHero data={data} />
    <OpeningCounter data={data} />
  </Layout>
)

export const query = graphql`
  query NewsletterSignupSuccess {
    successPage: contentfulObject(name: { eq: "Sign Up Success Page" }) {
      value {
        heading
        indicator
        subHeading1
        subHeading2
      }
    }
    layout: contentfulObject(name: { eq: "Layout" }) {
      value {
        buttons {
          becomeMember
          signMeUp
          joinTeam
          cookieBannerAccept
          continueToMagazine
          goToHomepage
        }
        footer {
          magazine
          termsAndConditions
          copyright
        }
        menu {
          magazine
          aboutUs
          joinCommunity
        }
        timer {
          heading
          days
          hours
          minutes
          subHeading
        }
        texts {
          stayTuned
          byClickingThisButton
          emailInputPlaceholder
        }
        cookieBanner {
          text
        }
        legalPageNames {
          privacyPolicy
          cookiePolicy
          termsAndConditions
        }
      }
    }
  }
`

export default NewsletterSignupSuccess
