import Hero from '../sections/about-us/hero'
import Interested from '../sections/about-us/interested'
import Layout from '../layout'
import MainImages from '../sections/about-us/main-images'
import MeetTheBand from '../sections/about-us/meet-the-band'
import MiddleImage from '../sections/about-us/middle-image'
import OurValues from '../sections/about-us/our-values'
import React from 'react'
import StrongVision from '../sections/about-us/strong-vision'
import { graphql } from 'gatsby'

const AboutUs = ({ data }) => (
  <Layout data={data} highlightUrl="/about-us">
    <Hero data={data} />
    <MainImages data={data} />
    <StrongVision data={data} />
    <MiddleImage data={data} />
    <MeetTheBand data={data} />
    <OurValues data={data} />
    <Interested data={data} />
  </Layout>
)

export const query = graphql`
  query AboutUsPage {
    aboutUs: contentfulAboutUsPage(name: { eq: "About Us" }) {
      heroHeading
      heroSubHeading
      mainBannerHeading
      mainBannerSubHeading
      middleHeading
      middleSubHeading
      middleBannerHeading
      middleBannerSubHeading
      theBandSubHeading {
        childMarkdownRemark {
          html
        }
      }
      theBandHeading
      theBandMembers {
        max {
          description
        }
        wolf {
          description
        }
        bruno {
          description
        }
        diana {
          description
        }
        daniel {
          description
        }
        patrick {
          description
        }
        tommaso {
          description
        }
        ana {
          description
        }
        nidhi {
          description
        }
        diogo {
          description
        }
      }
      ourValues {
        heading
        subHeading
        items {
          index
          title
          text
        }
      }
      bottomHeading
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
          jobs
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

export default AboutUs
