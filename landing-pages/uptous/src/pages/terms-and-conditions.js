import Layout from '../layout'
import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Header = styled.div`
  font-size: 32px;
  text-align: center;
  font-weight: 900;
  margin-top: 80px;
`

const TermsAndConditions = ({ data }) => (
  <Layout data={data}>
    <Header>{data.layout.value.legalPageNames.termsAndConditions}</Header>
    <Section>
      <div dangerouslySetInnerHTML={{ __html: data.termsAndConditions.text.childContentfulRichText.html }}></div>
    </Section>
  </Layout>
)

export const query = graphql`
  query TermsAndConditionsPage {
    termsAndConditions: contentfulLegalPage(name: { eq: "Terms and Conditions" }) {
      text {
        childContentfulRichText {
          html
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

export default TermsAndConditions
