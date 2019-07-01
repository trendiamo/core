import React from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import LogoGrey from '../images/logo-grey.svg'
import MobileMenu from './mobile-menu'

import menuIcon from '../images/menu-icon.svg'

const StyledMenuIcon = styled.img.attrs({
  src: menuIcon,
})`
  padding-left: 30px;
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
    <a className="logo-link" href="/">
      <img alt={siteTitle} src={LogoGrey} />
    </a>
    <nav>
      <a className="header-link" href="#what">
        {'What you get'}
      </a>
      <a className="header-link" href="#product">
        {'Product'}
      </a>
      <a className="header-link" href="#pricing">
        {'Pricing'}
      </a>
      <Button className="js-request-demo" color="#fff">
        {'Get Started'}
      </Button>
      <StyledMenuIcon onClick={toggleMobileMenu} />
    </nav>
    <MobileMenu layout={layout} locale={locale} siteTitle={siteTitle} toggleMobileMenu={toggleMobileMenu} />
  </header>
)

const StyledHeader = styled(React.forwardRef(Header))`
  padding: 2rem;

  background: linear-gradient(to right, #fff 0%, #fff 50%, #f35c39 50%, #f35c39 100%);
  width: 100vw;

  &.fixed {
    position: fixed;
    padding: 10px 1rem;
    z-index: 10;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  nav,
  & {
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

  .logo-link img {
    width: 11vw;
  }

  .header-link {
    font-size: 1.25vw;
    font-weight: 500;
    line-height: 30px;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    border-bottom: 2px solid transparent;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 2vw;
    white-space: nowrap;
  }

  ${Button} {
    display: none;
  }
  @media (min-width: 900px) {
    ${Button} {
      display: block;
    }
  }
`

export default StyledHeader
