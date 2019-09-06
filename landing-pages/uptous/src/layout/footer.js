import React from 'react'
import styled from 'styled-components'

import Container from '../components/container'
import Section from '../components/section'
import { openModal } from '../utils'
import IconYouTube from '../images/youtube.svg'
import IconInstagram from '../images/instagram.svg'

const Header = styled.div``
const Links = styled.div``
const LegalText = styled.div``
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

const Footer = styled(({ className }) => {
  return (
    <footer className={className}>
      <Section>
        <Container>
          <Links>
            <div>
              <Header>{'Information'}</Header>
              <a href="mailto:hello@uptous.com">{'Email us'}</a>
              <a href="#lega-notice" onClick={onLegalNoticeClick}>
                {'Legal Notice'}
              </a>
              <a href="#privacy-policy" onClick={onPrivacyPolicyClick}>
                {'Privacy & Cookies'}
              </a>
            </div>
            <div>
              <Header>{'Follow us'}</Header>
              <a
                href="https://www.youtube.com/channel/UCnEQGnoZb_jEjMtgNsvLMVQ"
                rel="noopener noreferrer"
                target="_blank"
              >
                <StyledIconYouTube />
              </a>
              <a href="https://www.instagram.com/_uptous/" rel="noopener noreferrer" target="_blank">
                <StyledIconInstagram />
              </a>
            </div>
          </Links>
          <LegalText>
            <b>{'UPTOUS'}</b>
            {' © Copyright 2019 uptous.co All rights reserved.'}
          </LegalText>
        </Container>
      </Section>
    </footer>
  )
})`
  background-color: #e7ecef;
  color: #272a32;
  ${Section} {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 20px;
  }
  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 620px;
  }
  ${Links} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 2rem;
    > div {
      margin-left: 20px;
      margin-right: 20px;
      margin-bottom: 1.9rem;
      flex: 1;
    }
  }
  ${Links} > div:nth-child(2) {
    text-align: right;
  }
  ${Header} {
    font-family: 'Nunito Sans', sans-serif;
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: 900;
    margin-bottom: 0.7rem;
    white-space: nowrap;
  }
  a {
    display: block;
    font-size: 0.75rem;
    line-height: 1.8;
    color: #272a32;
    text-decoration: none;
  }
  ${LegalText} {
    font-size: 0.58rem;
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
      padding-top: 55px;
    }
  }
`

export default Footer
