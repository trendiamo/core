import React from 'react'
import { graphql } from 'gatsby'

import AboutImg from '../sections/about-img'
import AboutPortraits from '../sections/about-portraits'
import AboutStory from '../sections/about-story'
import AboutText from '../sections/about-text'
import Layout from '../components/layout'

const AboutPage = ({ className, pageContext, data }) => (
  <Layout className={className} layout={data.layout} locale={pageContext.locale}>
    <AboutImg aboutImg={data.aboutImg} />
    <AboutText aboutText={data.aboutText} />
    <AboutStory aboutStory={data.aboutStory} />
    <AboutPortraits aboutPortraits={data.aboutPortraits} teamMembers={data.teamMembers} />
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
  }
`
