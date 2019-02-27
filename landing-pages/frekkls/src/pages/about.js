import React from 'react'
import { graphql } from 'gatsby'

import AboutImg from '../sections/about-img'
import AboutInvestors from '../sections/about-investors'
import AboutJobs from '../sections/about-jobs'
import AboutTeam from '../sections/about-team'
import AboutText from '../sections/about-text'
import Layout from '../components/layout'

const AboutPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <AboutImg aboutImg={data.aboutImg} />
    <AboutText aboutText={data.aboutText} />
    <AboutTeam aboutPortraits={data.aboutPortraits} teamMembers={data.teamMembers} />
    <AboutInvestors aboutInvestors={data.aboutInvestors} investors={data.investors} />
    <AboutJobs aboutJobs={data.aboutJobs} jobOpenings={data.jobOpenings} layout={data.layout} />
  </Layout>
)

export default AboutPage

export const query = graphql`
  query AboutPage($locale: String) {
    layout: contentfulLayout(name: { eq: "Layout-v2" }, node_locale: { eq: $locale }) {
      ...Layout
    }
    aboutImg: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      teamPicture {
        fixed(width: 1280) {
          src
        }
      }
    }
    aboutText: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      openerHeading
      openerSubHeading
      openerText
    }
    aboutStory: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      textSectionHeading
      textSectionText {
        childContentfulRichText {
          html
        }
      }
    }
    aboutInvestors: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      investorSectionHeading
      investorSectionSubHeading
      investerSectionText {
        investerSectionText
      }
    }
    investors: allContentfulInvestor(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          name
          logo {
            file {
              url
              fileName
            }
          }
        }
      }
    }
    aboutPortraits: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      teamSectionHeading
    }
    teamMembers: allContentfulAboutPageMember(filter: { node_locale: { eq: $locale } }, sort: { fields: order }) {
      edges {
        node {
          id
          profileName
          jobTitle
          profileDescription
          profilePicture {
            fixed {
              src
            }
          }
        }
      }
    }
    aboutJobs: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      jobSectionHeading
      jobSectionMainText {
        jobSectionMainText
      }
      jobSectionSubHeading
      jobSectionSubText {
        jobSectionSubText
      }
    }
    jobOpenings: allContentfulJobOpening(filter: { node_locale: { eq: "en-US" } }) {
      edges {
        node {
          id
          title
          jobLink
          jobType
        }
      }
    }
  }
`
