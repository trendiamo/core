import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from './container'
import locales from '../../locales'
import Logo from './logo'
import { OutlineButton } from './button'

const Header = styled(({ className, layout, locale, siteTitle }) => (
  <header className={className}>
    <Container>
      <Link id="header-logo" to="/">
        <Logo alt={siteTitle} />
      </Link>
      <nav>
        <Link to={`${locales[locale].path}/demo`}>{layout.demo}</Link>
        <Link className="header-link-hide-s" to={`${locales[locale].path}/about`}>
          {layout.about}
        </Link>
        <Link className="header-link-hide-s" to={`${locales[locale].path}/blog`}>
          {layout.blog}
        </Link>
        <a className="header-link-hide-s" href="mailto:hello@trendiamo.com">
          {layout.contact}
        </a>
        <OutlineButton className="js-request-demo">{layout.tryNow}</OutlineButton>
      </nav>
    </Container>
  </header>
))`
  padding: 1.5rem 1rem;
  font-family: Dosis, sans-serif;

  #header-logo {
    width: 15%;
    min-width: 150px;
    max-width: 40%;
  }

  nav,
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-link-hide-s {
    display: none;
  }
  @media (min-width: 530px) {
    .header-link-hide-s {
      display: block;
    }
  }

  nav a {
    font-size: 12px;
    line-height: 3;
    font-weight: 700;
    letter-spacing: 0.7px;
    color: #393939;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 10px;
    white-space: nowrap;
  }

  @media (min-width: 900px) {
    nav a {
      margin-right: 40px;
      font-size: 20px;
    }
  }

  ${OutlineButton} {
    font-size: 12px;
    padding: 10px;
  }

  @media (min-width: 900px) {
    ${OutlineButton} {
      font-size: 20px;
      padding: 20px 30px;
    }
  }
`

export default Header
