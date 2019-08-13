import React from 'react'
import styled from 'styled-components'
import tingle from 'tingle.js'

import Container from '../components/container'
import Section from '../components/section'

const Modal = tingle.modal
const Header = styled.div``
const Links = styled.div``
const LegalText = styled.div``

const openModal = modalElementSelector => {
  const legalNoticeContent = document.querySelector(modalElementSelector).innerHTML
  const modal = new Modal()
  modal.setContent(legalNoticeContent)
  modal.open()
}

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
                {'YouTube'}
              </a>
              <a href="https://www.instagram.com/_uptous/" rel="noopener noreferrer" target="_blank">
                {'Instagram'}
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
  background-color: #1a3b50;
  color: #fff;
  ${Section} {
    padding-top: 40px;
  }
  ${Container} {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
  }
  ${Links} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
  }
  ${Links} > div:nth-child(2) {
    text-align: right;
  }
  ${Header} {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  a {
    display: block;
    line-height: 1.8;
    color: #fff;
    text-decoration: none;
  }
  ${LegalText} {
    font-size: 0.7rem;
  }

  @media (min-width: 1000px) {
    ${Section} {
      padding-top: 100px;
    }
  }
`

export default Footer
