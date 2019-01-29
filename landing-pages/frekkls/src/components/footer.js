import Container from './container'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import BgBottom from '../images/bg-bottom.svg'
import locales from '../../locales'

const FooterFlex = styled.div`
  @media (min-width: 900px) {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
`

const Footer = styled(({ className, layout, locale }) => (
  <footer className={className}>
    <Container>
      <h3>{layout.footerInfo}</h3>
      <FooterFlex>
        <div>
          <Link to={`${locales[locale].path}/demo`}>{layout.demo}</Link>
          <Link to={`${locales[locale].path}/about`}>{layout.about}</Link>
          <Link to={`${locales[locale].path}/blog`}>{layout.blog}</Link>
          <a href="mailto:hello@trendiamo.com">{layout.contact}</a>
          <Link className="js-request-demo" to="#demo">
            {layout.demo2}
          </Link>
          <Link className="js-legal-notice" to="#legal-notice">
            {layout.legal}
          </Link>
          <Link className="js-privacy-cookies" to="#privacy-cookies">
            {layout.privacy}
          </Link>
        </div>
        <p>
          {'© '}
          {new Date().getFullYear()} {layout.outro}
        </p>
      </FooterFlex>
    </Container>
  </footer>
))`
  padding: 4rem 1rem;
  background-image: url('${BgBottom}');
  background-repeat: no-repeat;
  background-position: 3% -70%;

  @media (min-width: 900px) {
    padding-top: 0;
    text-align: left;
    background-image: none;
  }

  h3 {
    font-weight: 500;
    margin-bottom: 2rem;
  }

  a {
    font-size: 20px;
    display: block;
    color: #393939;
    text-decoration: none;
    line-height: 2.25;
  }

  p {
    font-size: 14px;
    font-weight: 600;
    margin: 2rem 0 0;
  }
`

export default Footer
