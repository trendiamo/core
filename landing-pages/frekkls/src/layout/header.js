import React, { useCallback } from 'react'
import styled from 'styled-components'

import Button from '../components/button'
import LogoGrey from '../images/logo-grey.svg'
import MenuIcon from '../images/menu-icon.svg'
import MobileMenu from './mobile-menu'

const StyledLogo = styled.img`
  @media (max-width: 899px) {
    filter: invert(1);
  }
`

const StyledMenuIcon = styled.img.attrs({
  src: MenuIcon,
})`
  padding-left: 30px;
  height: 20px;
  cursor: pointer;
  @media (min-width: 900px) {
    display: none;
  }
`

const toggleMobileMenu = () => {
  document.body.classList.toggle('mobile-menu-open')
}

const Header = ({ className, layout, locale, siteTitle }, ref) => {
  const onClick = useCallback(event => {
    event.preventDefault()
    const element = document.querySelector(event.target.getAttribute('href'))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  })

  const onCtaButtonClick = useCallback(() => {
    window.frekklsOpenDemoModal()
  }, [])

  return (
    <header className={className} ref={ref}>
      <a className="logo-link" href="/">
        <StyledLogo alt={siteTitle} src={LogoGrey} />
      </a>
      <nav>
        <a className="header-link" href="#what-you-get" onClick={onClick}>
          {'What you get'}
        </a>
        <a className="header-link" href="#product" onClick={onClick}>
          {'Product'}
        </a>
        <a className="header-link" href="#pricing" onClick={onClick}>
          {'Pricing'}
        </a>
        <Button bg="rgba(255, 255, 255, 0.3)" color="#fff" onClick={onCtaButtonClick}>
          {'Get Started'}
        </Button>
        <StyledMenuIcon onClick={toggleMobileMenu} />
      </nav>
      <MobileMenu layout={layout} locale={locale} siteTitle={siteTitle} toggleMobileMenu={toggleMobileMenu} />
    </header>
  )
}

const StyledHeader = styled(React.forwardRef(Header))`
  padding: 1rem 2rem;
  position: absolute;
  width: 100vw;
  z-index: 1;
  align-items: flex-start;

  nav {
    align-items: center;
  }

  nav,
  & {
    display: flex;
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
    width: 100px;
  }
  @media (min-width: 900px) {
    .logo-link img {
      width: 11vw;
    }
  }

  .header-link {
    font-size: 1.25vw;
    font-weight: 500;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 2vw;
    white-space: nowrap;
  }

  nav > ${Button} {
    display: none;
  }
  @media (min-width: 900px) {
    nav > ${Button} {
      display: block;
    }
  }
`

export default StyledHeader
