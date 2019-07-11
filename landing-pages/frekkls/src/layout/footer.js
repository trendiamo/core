import React, { useCallback } from 'react'
import styled from 'styled-components'

const FooterFlex = styled.div`
  width: 100%;
  display: flex;
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
    max-width: 1200px;
    justify-content: space-between;
    text-align: left;
    flex-direction: row;
    padding-top: 2rem;
  }

  @media (max-width: 899px) {
    .footer-links {
      padding: 4vw;
    }

    .footer-links a,
    .footer-links p {
      font-size: 4vw;
    }
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
  flex-direction: column;
  margin-left: 1vw;
  margin-right: 1vw;
  align-items: center;
  @media (min-width: 900px) {
    align-items: flex-start;
  }
`

const FooterHeader = styled.div`
  font-size: 1.25vw;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 4;

  @media (max-width: 899px) {
    font-size: 4vw;
  }
`

const FooterContent = () => {
  const onLegalNoticeClick = useCallback(() => {
    window.frekklsOpenLegalNoticeModal()
    event.preventDefault()
    return false
  }, [])

  const onPrivacyCookiesClick = useCallback(() => {
    window.frekklsOpenPrivacyCookiesModal()
    event.preventDefault()
    return false
  }, [])

  return (
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
          <a href="#legal-notice" onClick={onLegalNoticeClick}>
            {'Legal Notice'}
          </a>
          <a href="#privacy-cookies" onClick={onPrivacyCookiesClick}>
            {'Privacy & Cookies'}
          </a>
        </FooterColumn>
        <FooterColumn flex="3">
          {/* <FooterHeader>{'Newsletter'}</FooterHeader>
          <p>{'The way online sales work will change drastically in 2019!'}</p>
          <p>{"Sign up to our newsletter and make sure you don't miss any of the good bits!"}</p> */}
        </FooterColumn>
      </FooterSection>
    </FooterFlex>
  )
}

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
    margin-bottom: 2rem;
  }
`

export default Footer
