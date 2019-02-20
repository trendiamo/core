import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from './button'
import Container from './container'
import LangSelector from './lang-selector'
import locales from '../../locales'
import Logo from './logo'

const Header = styled(({ className, layout, locale, siteTitle }) => (
  <header className={className}>
    <Container>
      <Link to={`${locales[locale].path}/`}>
        <Logo alt={siteTitle} />
      </Link>
      <nav>
        <Link className="header-link" to={`${locales[locale].path}/demo`}>
          {layout.demo}
        </Link>
        <Link className="header-link header-link-hide-s" to={`${locales[locale].path}/about`}>
          {layout.about}
        </Link>
        <Link className="header-link header-link-hide-s" to={`${locales[locale].path}/blog`}>
          {layout.blog}
        </Link>
        <a className="header-link header-link-hide-s" href="mailto:hello@trendiamo.com">
          {layout.contact}
        </a>
        <Button className="js-request-demo">{layout.tryNow}</Button>
        <LangSelector locale={locale} />
      </nav>
    </Container>
  </header>
))`
  padding: 1.5rem 1rem;
  font-family: Roboto, sans-serif;

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

  nav .header-link {
    font-size: 12px;
    line-height: 3;
    letter-spacing: 0.7px;
    color: #393939;
    text-decoration: none;
    margin-right: 10px;
    white-space: nowrap;
  }

  @media (min-width: 900px) {
    nav .header-link {
      margin-right: 40px;
      font-size: 20px;
    }
  }

  ${Button} {
    font-size: 12px;
    padding: 10px;
  }

  @media (min-width: 900px) {
    ${Button} {
      font-size: 20px;
      padding: 13px 20px;
    }
    ${Container} {
      margin-right: 0 auto;
    }
  }
`

export default Header
