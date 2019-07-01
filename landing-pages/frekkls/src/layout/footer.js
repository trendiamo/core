import React from 'react'
import styled from 'styled-components'

const FooterFlex = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  text-align: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  .footer-links a {
    text-decoration: none;
    color: #000;
    line-height: 2;
  }

  .footer-links a,
  .footer-links p {
    font-size: 1vw;
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
  flex: ${({ flex }) => flex};
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 1vw;
  margin-right: 1vw;
`

const FooterHeader = styled.div`
  font-size: 1.25vw;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 4;
`

const FooterContent = () => (
  <FooterFlex>
    <FooterSection className="footer-links" flex="2">
      <FooterColumn flex="1">
        <FooterHeader>{'Follow Us'}</FooterHeader>
        <a href="https://medium.com/@frekkls">{'Medium'}</a>
        <a href="https://www.linkedin.com/company/frekkls/">{'Linkedin'}</a>
        <a href="https://www.facebook.com/frekklsapp/">{'Facebook'}</a>
        <a href="https://www.instagram.com/frekkls.app/">{'Instagram'}</a>
      </FooterColumn>
      <FooterColumn flex="1">
        <FooterHeader>{'Information'}</FooterHeader>
        <a className="js-legal-notice" href="#legal-notice">
          {'Legal Notice'}
        </a>
        <a className="js-privacy-cookies" href="#privacy-cookies">
          {'Privacy & Cookies'}
        </a>
      </FooterColumn>
      <FooterColumn flex="3">
        <FooterHeader>{'Newsletter'}</FooterHeader>
        <p>{'The way online sales work will change drastically in 2019!'}</p>
        <p>{"Sign up to our newsletter and make sure you don't miss any of the good bits!"}</p>
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
    <FooterContent layout={layout} locale={locale} />
    <footer>
      <CopyrightContent />
    </footer>
  </div>
))`
  background-color: #fafafa;
  display: flex;
  align-items: center;
  flex-direction: column;

  footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  h3 {
    font-weight: 500;
    margin-bottom: 2rem;
  }
`

export default Footer
