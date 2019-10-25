import Button from '../components/button'
import Layout from '../layout'
import LeftArrowIcon from '../images/left-arrow.svg'
import LogoBlack from '../images/logo-black.svg'
import React, { useEffect } from 'react'
import Seo from '../layout/seo'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'

const FlexDiv = styled.div``
const MainContainer = styled.div``
const SideContainer = styled.div``
const MainInnerContainer = styled.div``
const LogoLink = styled(Link)``

const onInfluencerClick = () => (window.location = 'https://app.uptous.co/signup')
const onBrandClick = () => {
  if (!window.hbspt) return
  var div = document.querySelector('.js-hide-on-brand-signup-form')
  if (div) div.style.display = 'none'
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: '691f025b-949e-4778-93a8-34aeba6e3b9a',
    target: '.brand-signup-form',
  })
}

const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #333;
  font-size: 26px;
  span {
    vertical-align: middle;
    line-height: 1;
    text-transform: uppercase;
  }
  svg {
    width: 26px;
    height: 26px;
    vertical-align: middle;
    margin-right: 10px;
  }
  margin-bottom: 50px;
`

const SignupPage = styled(({ className, data }) => {
  useEffect(() => {
    if (window.location.hash !== '#brand') return
    onBrandClick()
  }, [])

  return (
    <Layout data={{ legalNotice: data.legalNotice.text, privacyPolicy: data.privacyPolicy.text }} light>
      <Seo title="Uptous - Signup" />
      <FlexDiv className={className}>
        <MainContainer>
          <MainInnerContainer>
            <StyledLink to="/">
              <LeftArrowIcon />
              <span>{'Home'}</span>
            </StyledLink>
            <LogoLink to="/">
              <LogoBlack alt="Uptous - We help you spread your impact" />
            </LogoLink>
            <div className="js-hide-on-brand-signup-form">
              <h1>{'Start spreading your positive impact!'}</h1>
              <Button onClick={onBrandClick}>{'I am a brand'}</Button>
              <Button onClick={onInfluencerClick}>{'I am an influencer'}</Button>
            </div>
            <div className="brand-signup-form" />
          </MainInnerContainer>
        </MainContainer>
        <SideContainer>
          <LogoLink to="/">
            <LogoBlack alt="Uptous - We help you spread your impact" />
          </LogoLink>
          <h2>{'We spread positive impact'}</h2>
          <p>
            {'Join the network that connects brands and impacters to create positive impact on a performance-basis.'}
          </p>
        </SideContainer>
      </FlexDiv>
    </Layout>
  )
})`
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;

  ${MainContainer} {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex: 7;
    ${LogoLink} {
      display: none;
    }
    h1 {
      margin-bottom: 1.5rem;
      font-size: 24px;
      line-height: 1.225;
      @media (min-width: 1000px) {
        font-size: calc(0.8rem + 1.2vw);
      }
    }
  }
  ${MainInnerContainer} {
    max-width: 500px;
  }
  ${SideContainer} {
    background-color: #007374;
    color: #fff;
    flex: 5;
    padding: 60px;

    ${LogoLink} {
      display: inline-block;
      width: 6rem;
      margin-bottom: 1.5rem;
      svg {
        filter: invert(1);
      }
    }
    h2 {
      display: none;
    }
    p {
      font-size: 24px;
      line-height: 1.225;
      @media (min-width: 1000px) {
        font-size: calc(0.8rem + 1.2vw);
      }
    }
  }
  ${Button} {
    display: block;
    background-color: #ff4f58;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.8rem;
    width: 11rem;
    height: 60px;
    span {
      line-height: 60px;
    }
  }

  @media (min-width: 1000px) {
    flex-direction: row;
    ${MainContainer} {
      justify-content: center;
      ${LogoLink} {
        display: inline-block;
        width: 6rem;
        margin-bottom: 1.5rem;
      }
    }
    ${SideContainer} {
      ${LogoLink} {
        display: none;
      }
      h2 {
        display: block;
        text-transform: uppercase;
        font-size: 13.34vw;
        font-weight: 900;
        line-height: 0.9;
        margin-bottom: 1.5rem;
        @media (min-width: 375px) {
          font-size: 50px;
        }
        @media (min-width: 1000px) {
          font-size: calc(20px + 4vw);
        }
      }
    }
  }
`

export const query = graphql`
  query SignupPage {
    hero: contentfulHomepage(name: { eq: "Homepage" }) {
      heroHeading
      heroSubheading
    }
    legalNotice: contentfulModalText(name: { eq: "Legal Notice" }) {
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

export default SignupPage
