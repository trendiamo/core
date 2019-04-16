import React from 'react'
import { graphql } from 'gatsby'

import AboutImg from '../sections/about-img'
import AboutJobs from '../sections/about-jobs'
import AboutStory from '../sections/about-story'
import AboutTeam from '../sections/about-team'
import AboutText from '../sections/about-text'
import Layout from '../components/layout'

const AboutPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <AboutImg aboutImg={data.aboutImg} />
    <AboutText aboutText={data.aboutText} />
    <AboutTeam aboutPortraits={data.aboutPortraits} teamMembers={data.teamMembers} />
    <AboutStory aboutStory={data.aboutStory} layout={data.layout} />
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
        fixed(width: 1400) {
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
      textSectionCta
    }
    aboutInvestors: contentfulAboutPage(name: { eq: "About Page" }, node_locale: { eq: $locale }) {
      investorSectionHeading
      investorSectionSubHeading
      investerSectionText {
        investerSectionText
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
