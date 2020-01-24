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

const PrivacyPolicy = ({ data }) => {
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
    <Layout data={data}>
      <Header>{data.layout.value.legalPageNames.privacyPolicy}</Header>
      <Section fullWidth>
        <a
          className="iubenda-white no-brand iubenda-embed iub-body-embed"
          href="https://www.iubenda.com/privacy-policy/88077835"
          title={data.layout.value.legalPageNames.privacyPolicy}
        >
          {data.layout.value.legalPageNames.privacyPolicy}
        </a>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query PrivacyPolicyPage {
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

export default PrivacyPolicy
