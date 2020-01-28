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

const CookiePolicy = ({ data }) => {
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
      <Header>{data.layout5.value.legalPageNames.cookiePolicy}</Header>
      <Section fullWidth>
        <a
          className="iubenda-white no-brand iubenda-embed iub-body-embed"
          href="https://www.iubenda.com/privacy-policy/88077835/cookie-policy"
          title={data.layout5.value.legalPageNames.cookiePolicy}
        >
          {data.layout5.value.legalPageNames.cookiePolicy}
        </a>
      </Section>
    </Layout>
  )
}

export const query = graphql`
  query CookiePolicyPage {
    layout5: contentfulObject(name: { eq: "Layout" }) {
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

export default CookiePolicy
