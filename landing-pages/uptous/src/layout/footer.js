import React from 'react'
import styled from 'styled-components'

import IconInstagram from '../images/instagram.svg'
import IconYouTube from '../images/youtube.svg'
import Section from '../components/section'
import { openModal } from '../utils'

const Header = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  text-transform: uppercase;
  font-size: 1.25rem;
  font-weight: 900;
  white-space: nowrap;
  color: ${({ red }) => (red ? '#FF3955' : '#333')};
`
const SocialLinksContainer = styled.div``
const LegalText = styled.div``
const FooterLinksContainer = styled.div``
const FooterLinksSection = styled.div``
const DarkSection = styled.div``
const StyledIconYouTube = styled(IconYouTube)``
const StyledIconInstagram = styled(IconInstagram)``

const onLegalNoticeClick = event => {
  event.preventDefault()
  openModal('.legal-notice-modal-content')
}

const onPrivacyPolicyClick = event => {
  event.preventDefault()
  openModal('.privacy-policy-modal-content')
}

const SocialLinks = () => (
  <SocialLinksContainer>
    <div>
      <Header red>{'Join Us'}</Header>
    </div>
    <div>
      <a href="https://www.instagram.com/_uptous/" rel="noopener noreferrer" target="_blank">
        <Header>{'Instagram'}</Header>
      </a>
      <a href="https://www.youtube.com/channel/UCnEQGnoZb_jEjMtgNsvLMVQ" rel="noopener noreferrer" target="_blank">
        <Header>{'Youtube'}</Header>
      </a>
      <a
        href="https://open.spotify.com/show/6I35XQLBa4sSVXcEOBFlOf?si=nkX4hKc3RWi5nK7J1rrnEQ"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Header>{'Podcast'}</Header>
      </a>
      <a href="https://www.facebook.com/uptouspositiveimpact" rel="noopener noreferrer" target="_blank">
        <Header>{'Facebook'}</Header>
      </a>
      <a href="https://www.linkedin.com/company/20135745" rel="noopener noreferrer" target="_blank">
        <Header>{'Linkedin'}</Header>
      </a>
    </div>
  </SocialLinksContainer>
)

const FooterLinks = () => (
  <FooterLinksContainer>
    <FooterLinksSection>
      <Header>{'About'}</Header>
      <a href="/pledge">{'Our Pledge'}</a>
      <a href="https://app.uptous.co">{'Our Product'}</a>
    </FooterLinksSection>
    <FooterLinksSection>
      <Header>{'Join'}</Header>
      <a href="https://app.uptous.co/signup">{'As Impacter'}</a>
      <a href="/signup#brand">{'As Brand'}</a>
    </FooterLinksSection>
    <FooterLinksSection>
      <Header>{'Info'}</Header>
      <a href="mailto:hello@uptous.co">{'Contact Us'}</a>
      <a href="#legal-notice" onClick={onLegalNoticeClick}>
        {'Legal Notice'}
      </a>
      <a href="#privacy-policy" onClick={onPrivacyPolicyClick}>
        {'Privacy & Cookies'}
      </a>
    </FooterLinksSection>
  </FooterLinksContainer>
)

const Footer = styled(({ className }) => {
  return (
    <footer className={className}>
      <Section>
        <SocialLinks />
      </Section>
      <DarkSection>
        <FooterLinks />
        <LegalText>
          <b>{'UPTOUS'}</b>
          {' © Copyright 2019 uptous.co All rights reserved.'}
        </LegalText>
      </DarkSection>
    </footer>
  )
})`
  ${Section} {
    background-color: #e7ecef;
    color: #272a32;
    padding-left: 0;
    padding-right: 0;
    padding: 5px 20px;
    display: block;
  }
  a {
    text-decoration: none;
  }
  ${SocialLinksContainer} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin: 40px 0;
    @media (min-width: 1200px) {
      flex-direction: row;
    }
    @media (min-width: 1000px) {
      ${Header} {
        margin: 0;
      }
    }
    > div:nth-child(2) {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-width: 920px;
      flex-direction: column;
      @media (min-width: 1000px) {
        margin-top: 30px;
        flex-direction: row;
      }
      @media (min-width: 1200px) {
        margin-left: 50px;
        margin-top: 0;
      }
      a {
        margin-top: 15px;
        @media (min-width: 1000px) {
          margin-left: 30px;
          margin-top: 0;
        }
      }
    }
  }
  ${DarkSection} {
    background: #282732;
    padding: 50px;
    ${Header} {
      color: #fff;
    }
    a {
      display: block;
      font-size: 0.75rem;
      line-height: 1.8;
      color: #272a32;
      text-decoration: none;
      color: #fff;
    }
  }
  ${FooterLinksContainer} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 0px;
  }
  ${FooterLinksSection} {
    margin-bottom: 30px;
  }
  @media (min-width: 1000px) {
    ${FooterLinksContainer} {
      flex-direction: row;
      justify-content: normal;
      margin-bottom: 40px;
    }
    ${FooterLinksSection} {
      margin-right: 130px;
      margin-bottom: 0;
    }
  }
  ${LegalText} {
    font-size: 0.58rem;
    color: #fff;
    text-align: center;
  }

  ${StyledIconYouTube} {
    float: right;
    width: 60px;
    height: 60px;
    margin-left: 20px;
  }

  ${StyledIconInstagram} {
    float: right;
    width: 60px;
    height: 60px;
  }

  @media (min-width: 1000px) {
    ${Section} {
      padding: 5px 50px;
    }
  }
`

export default Footer
