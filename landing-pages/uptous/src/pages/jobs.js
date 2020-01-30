import Hero from '../sections/jobs/hero'
import JobsList from '../sections/jobs/jobs-list'
import Layout from '../layout'
import MainContent from '../sections/jobs/main-content'
import React from 'react'
import SeoImageSrc from '../images/jobs/og.jpg'
import { graphql } from 'gatsby'

const JobsPage = ({ data }) => (
  <Layout data={data} dataSeo={data.jobs.value.seo} highlightUrl="/jobs" seoImageSrc={SeoImageSrc}>
    <Hero data={data} />
    <MainContent data={data} />
    <JobsList data={data} />
  </Layout>
)

export const query = graphql`
  query JobsPage {
    jobs: contentfulObject(name: { eq: "Jobs Page" }) {
      value {
        heroHeading
        heroSubheading
        middleHeading
        middleDescription
        middleHeading2
        jobs {
          id
          name
          description
          jobTypes
        }
        jobTypes
        applyForThisJob
        seo {
          title
          description
        }
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

export default JobsPage
