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

const IndexPage = ({ data }) => (
  <Layout data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}>
    <Header>{'Terms and Conditions'}</Header>
    <Section>
      <div dangerouslySetInnerHTML={{ __html: data.termsAndConditions.text.childContentfulRichText.html }}></div>
    </Section>
  </Layout>
)

export const query = graphql`
  query TermsAndConditionsPage {
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

export default IndexPage
