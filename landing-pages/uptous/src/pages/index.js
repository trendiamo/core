import Construction from '../sections/construction'
import Layout from '../layout'
import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <Layout data={data}>
    <Construction data={data} />
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
          jobs
          termsAndConditions
          copyright
        }
        menu {
          magazine
          aboutUs
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
