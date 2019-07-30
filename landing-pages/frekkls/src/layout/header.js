import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from '../components/button'
import LogoGrey from '../images/logo-grey.svg'
import MenuIcon from '../images/menu-icon.svg'
import MobileMenu from './mobile-menu'

const StyledLogo = styled.img`
  ${({ headerColorScheme }) =>
    headerColorScheme === 'home'
      ? `
  filter: invert(1);
  @media (min-width: 900px) {
    filter: none;
  }
`
      : headerColorScheme === 'white-on-black' &&
        `  filter: invert(1);
`}
`

const StyledMenuIcon = styled.img.attrs({
  src: MenuIcon,
})`
  ${({ headerColorScheme }) => headerColorScheme === 'black-on-white' && 'filter: invert(1);'}
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

const Header = ({ className, hasGetStarted, headerLinks, layout, locale, headerColorScheme, siteTitle }, ref) => {
  const onClick = useCallback(event => {
    event.preventDefault()
    const element = document.querySelector(event.target.getAttribute('href'))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const onCtaButtonClick = useCallback(() => {
    window.frekklsOpenDemoModal()
  }, [])

  return (
    <header className={className} ref={ref}>
      <Link className="logo-link" to="/">
        <StyledLogo alt={siteTitle} headerColorScheme={headerColorScheme} src={LogoGrey} />
      </Link>
      <nav>
        {(headerLinks || []).map(headerLink =>
          headerLink.target.charAt(0) === '/' ? (
            <Link className="header-link" key={headerLink.target} to={headerLink.target}>
              {headerLink.text}
            </Link>
          ) : (
            <a className="header-link" href={headerLink.target} key={headerLink.target} onClick={onClick}>
              {headerLink.text}
            </a>
          )
        )}
        {hasGetStarted && (
          <Button
            bg="rgba(255, 255, 255, 0.3)"
            color={headerColorScheme === 'black-on-white' ? '#000' : '#fff'}
            onClick={onCtaButtonClick}
          >
            {'Get Started'}
          </Button>
        )}
        <StyledMenuIcon headerColorScheme={headerColorScheme} onClick={toggleMobileMenu} />
      </nav>
      <MobileMenu
        hasGetStarted={hasGetStarted}
        headerLinks={headerLinks}
        layout={layout}
        locale={locale}
        siteTitle={siteTitle}
        toggleMobileMenu={toggleMobileMenu}
      />
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
    color: ${({ headerColorScheme }) => (headerColorScheme === 'black-on-white' ? '#000' : '#fff')};
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
