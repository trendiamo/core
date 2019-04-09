import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from './button'
import Container from './container'
import locales from '../../locales'
import Logo from '../images/logo'
import MobileMenu from './mobile-menu'

import menuIcon from '../images/menu-icon.svg'

const StyledMenuIcon = styled.img.attrs({
  src: menuIcon,
})`
  padding-left: 30px;
  fill: #ff6e5c;
  height: 35px;
  @media (min-width: 900px) {
    display: none;
  }
`

const toggleMobileMenu = () => {
  document.body.classList.toggle('mobile-menu-open')
}

const Header = ({ className, layout, locale, siteTitle }, ref) => (
  <header className={className} ref={ref}>
    <Container>
      <Link className="logo-link" to={`${locales[locale].path}/`}>
        <Logo alt={siteTitle} />
      </Link>
      <nav>
        <Link className="header-link" to={`${locales[locale].path}/features`}>
          {layout.features}
        </Link>
        <Link className="header-link" to={`${locales[locale].path}/about`}>
          {layout.about}
        </Link>
        <Link className="header-link" to={`${locales[locale].path}/demo`}>
          {layout.demo}
        </Link>
        <Link className="header-link" to={`${locales[locale].path}/blog`}>
          {layout.blog}
        </Link>
        <Button className="js-request-demo">{layout.tryNow}</Button>
        <StyledMenuIcon onClick={toggleMobileMenu} />
      </nav>
    </Container>
    <MobileMenu layout={layout} locale={locale} siteTitle={siteTitle} toggleMobileMenu={toggleMobileMenu} />
  </header>
)

const StyledHeader = styled(React.forwardRef(Header))`
  padding: 1.5rem 1rem;
  font-family: Roboto, sans-serif;

  background: white;
  width: 100%;

  &.fixed {
    position: fixed;
    padding: 10px 1rem;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  nav,
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-link {
    display: none;
  }
  @media (min-width: 900px) {
    .header-link {
      display: block;
    }
  }

  .logo-link {
    align-self: flex-end;
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
    display: none;
    font-size: 12px;
    padding: 10px;
  }

  @media (min-width: 900px) {
    ${Button} {
      display: block;
      font-size: 20px;
      padding: 13px 20px;
    }
    ${Container} {
      margin-right: 0 auto;
    }
  }
`

export default StyledHeader
