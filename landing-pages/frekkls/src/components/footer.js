import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from './container'
import locales from '../../locales'
import Logo from '../images/logo-grey.svg'
import Section from './section'

const FooterFlex = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  .footer-links a {
    font-size: 16px;
    line-height: 1.4;
    text-decoration: none;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    color: #393939;
  }

  @media (min-width: 900px) {
    justify-content: space-between;
    text-align: left;
    flex-direction: row;
    padding-top: 2rem;
    align-items: end;
  }
`

const FooterSection = styled.div`
  ${({ flex }) => `flex: ${flex};`}
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  @media (min-width: 900px) {
    flex-direction: row;
    margin: 0;
  }
`

const FooterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    margin-top: 1rem;
  }

  @media (min-width: 900px) {
    align-items: flex-start;
    margin: 0;
    &:last-child {
      margin-top: 0rem;
    }
  }
`

const ContactUsHeader = styled.p`
  color: #707070;
  font-size: 20px;
  margin-top: 1rem;
  margin-bottom: 0;
`

const FollowUsHeader = styled.p`
  font-size: 16px;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
`

const MailTo = styled.a`
  font-size: 20px !important;
  color: rgba(0, 0, 0, 0.9) !important;
`

const FooterContent = ({ layout, locale }) => (
  <FooterFlex>
    <FooterSection flex="1">
      <FooterColumn>
        <Link to={`${locales[locale].path}/`}>
          <img alt="siteTitle" src={Logo} />
        </Link>
        <ContactUsHeader>{layout.contactPrompt}</ContactUsHeader>
        <MailTo href="mailto:hello@trendiamo.com">{'hello@trendiamo.com'}</MailTo>
      </FooterColumn>
    </FooterSection>
    <FooterSection className="footer-links" flex="2">
      <FooterColumn>
        <Link to={`${locales[locale].path}/about`}>{layout.about}</Link>
        <Link to={`${locales[locale].path}/blog`}>{layout.blog}</Link>
        <Link to={`${locales[locale].path}/about#jobs`}>{layout.careers}</Link>
      </FooterColumn>
      <FooterColumn>
        <Link className="js-request-demo" to="#demo">
          {layout.demo2}
        </Link>
        <Link className="js-legal-notice" to="#legal-notice">
          {layout.legal}
        </Link>
        <Link className="js-privacy-cookies" to="#privacy-cookies">
          {layout.privacy}
        </Link>
      </FooterColumn>
      <FooterColumn>
        <FollowUsHeader>{'Follow Us'}</FollowUsHeader>
        <a href="https://www.facebook.com/frekklsapp/">{'Facebook'}</a>
        <a href="https://www.instagram.com/frekkls.app/">{'Instagram'}</a>
        <a href="https://www.linkedin.com/company/frekkls/">{'Linkedin'}</a>
      </FooterColumn>
    </FooterSection>
  </FooterFlex>
)

const CopyrightDiv = styled.div`
  height: 6rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 1rem;

  p {
    line-height: 1.88;
    font-size: 16px;
    margin: 0;
    a {
      color: #ff683f;
      display: inline;
      font-weight: bold;
      text-decoration: none;
    }
  }

  @media (min-width: 900px) {
    height: 4rem;
    padding: 0;
  }
`

const DesktopCopyrightContent = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`

const MobileCopyrightContent = styled.div`
  display: block;
  @media (min-width: 900px) {
    display: none;
  }
`

const CopyrigtContent = () => (
  <div>
    <DesktopCopyrightContent>
      <p>
        {`Frekkls © Copyright ${new Date().getFullYear()}`}
        <strong>{' frekkls.com '}</strong>
        {'All rights reserved.'}
      </p>
    </DesktopCopyrightContent>
    <MobileCopyrightContent>
      <p>
        {`Frekkls © Copyright ${new Date().getFullYear()}`}
        <strong>{' frekkls.com '}</strong>
        <br />
        {'All rights reserved.'}
        <br />
        {'Powered by '}
        <a href="https://trendiamo.com/">{'Trendiamo GmbH'}</a>
        {'.'}
      </p>
    </MobileCopyrightContent>
  </div>
)

const CopyrightContent = () => (
  <CopyrightDiv>
    <CopyrigtContent />
  </CopyrightDiv>
)

const Footer = styled(({ className, layout, locale }) => (
  <div className={className}>
    <Section>
      <Container>
        <FooterContent layout={layout} locale={locale} />
      </Container>
    </Section>
    <footer>
      <Container>
        <CopyrightContent />
      </Container>
    </footer>
  </div>
))`
  footer {
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #f2f4f7;
  }

  ${Section} {
    padding-top: 2rem;
    padding-bottom: 0;

    @media (min-width: 900px) {
      padding-top: 0;
      text-align: left;
      background-image: none;
    }
  }

  ${Container} {
    width: 100%;
  }

  h3 {
    font-weight: 500;
    margin-bottom: 2rem;
  }
`

export default Footer
