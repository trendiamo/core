import Layout from '../layout'
import React, { useEffect } from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import { graphql } from 'gatsby'

const Header = styled.div`
  font-size: 32px;
  text-align: center;
  font-weight: 900;
  margin-top: 80px;
`

const IndexPage = ({ data }) => {
  useEffect(() => {
    var loader = function() {
      var s = document.createElement('script'),
        tag = document.getElementsByTagName('script')[0]
      s.src = 'https://cdn.iubenda.com/iubenda.js'
      tag.parentNode.insertBefore(s, tag)
    }
    loader()
  }, [])

  return (
    <Layout data={{ termsAndConditions: data.termsAndConditions.text, privacyPolicy: data.privacyPolicy.text }}>
      <Header>{'Privacy Policy'}</Header>
      <Section fullWidth>
        <a
          className="iubenda-white no-brand iubenda-embed iub-body-embed"
          href="https://www.iubenda.com/privacy-policy/88077835"
          title="Privacy Policy"
        >
          {'Privacy Policy'}
        </a>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query PrivacyPolicyPage {
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
