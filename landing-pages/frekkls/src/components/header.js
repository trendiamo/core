import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from './button'
import Container from './container'
import LangSelector from './lang-selector'
import locales from '../../locales'
import Logo from '../images/logo'

const Header = styled(({ className, layout, locale, siteTitle }) => (
  <header className={className}>
    <Container>
      <Link to={`${locales[locale].path}/`}>
        <Logo alt={siteTitle} />
      </Link>
      <nav>
        <Link className="header-link" to={`${locales[locale].path}/about`}>
          {layout.about}
        </Link>
        <Link className="header-link" to={`${locales[locale].path}/blog`}>
          {layout.blog}
        </Link>
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

  .header-link {
    display: none;
  }
  @media (min-width: 530px) {
    .header-link {
      display: block;
    }
  }

  .header-link {
    font-size: 12px;
    line-height: 3;
    letter-spacing: 0.7px;
    color: #393939;
    text-decoration: none;
    margin-right: 10px;
    white-space: nowrap;
  }

  @media (min-width: 900px) {
    .header-link {
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
