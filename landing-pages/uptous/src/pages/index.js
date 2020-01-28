import BottomHeadline from '../sections/bottom-headline'
import Hero from '../sections/hero'
import Layout from '../layout'
import OpeningCounter from '../sections/opening-counter'
import OurGoals from '../sections/our-goals'
import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <Layout data={data}>
    <Hero data={data} />
    <OpeningCounter data={data} />
    <OurGoals data={data} />
    <BottomHeadline data={data} />
  </Layout>
)

export const query = graphql`
  query HomePage {
    home: contentfulHomepage(name: { eq: "Homepage" }) {
      heroHeading
      heroSubheading
      firstColumn {
        items {
          title
          index
          text
        }
        heading
        subHeading
      }
      secondColumn {
        items {
          title
          index
          text
        }
        heading
        subHeading
      }
      lastPart
    }
    layout5: contentfulObject(name: { eq: "Layout" }) {
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

export default IndexPage
