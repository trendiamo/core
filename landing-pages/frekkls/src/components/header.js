import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from './button'
import Container from './container'
import LangSelector from './lang-selector'
import locales from '../../locales'
import Logo from '../images/logo'
import MobileMenu from './mobile-menu'
import { OutlineButton } from './button'

import menuIcon from '../images/mobile-hamburger.svg'

const StyledMenuIcon = styled.img.attrs({
  src: menuIcon,
})`
  fill: #ff6e5c;
  @media (min-width: 530px) {
    display: none;
  }
`

const StyledLangSelector = styled(LangSelector)`
  position: absolute;
  width: 40px;
  top: 52px;
  right: 10px;
  display: none;
  @media (min-width: 900px) {
    display: flex;
  }
`

const StyledOutlineButton = styled(OutlineButton)`
  font-size: 12px;
  padding: 10px;
  @media (min-width: 900px) {
    font-size: 20px;
    padding: 20px 30px;
  }
`

const toggleMobileMenu = () => {
  document.body.classList.toggle('mobile-menu-open')
}

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
        <StyledMenuIcon onClick={toggleMobileMenu} />
      </nav>
    </Container>
    <MobileMenu layout={layout} locale={locale} toggleMobileMenu={toggleMobileMenu} />
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
