import LogoBlack from '../images/logo.svg'
import MobileMenu from './mobile-menu'
import React from 'react'
import Section from '../components/section'
import styled from 'styled-components'
import { Link } from 'gatsby'

const HamburgerMenu = styled.div`
  cursor: pointer;
  height: 100%;
  width: 40px;
  position: absolute;
  top: 0;
  left: 15px;

  @media (min-width: 1000px) {
    display: none;
  }
`

const HamburgerTicks = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  width: 100%;
  height: 1px;
  background-color: #111;
  font-size: 0;
  transition: background-color 0.3s cubic-bezier(0.32, 0.74, 0.57, 1);
  user-select: none;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    width: 75%;
    height: 100%;
    background-color: #111;
    transition: transform 0.35s, width 0.2s cubic-bezier(0.32, 0.74, 0.57, 1);
  }
  &:before {
    transform: translateY(7px);
  }
  &:after {
    transform: translateY(-7px);
  }
`

const LogoFullContainer = styled.div`
  min-width: 100px;
  width: 100%;
  max-width: 180px;
`

const toggleMobileMenu = () => {
  document.body.classList.toggle('mobile-menu-open')
}

const StyledSection = styled(Section)`
  padding: 0;
  width: 100vw;
  z-index: 2;

  display: flex;
  height: 60px;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (min-width: 1000px) {
    padding: 33px 0 0px;
    justify-content: space-between;
    height: 82px;
  }
`

const HeaderLink = styled(Link)`
  display: none;
  font-size: 20px;
  color: #111;
  text-decoration: none;
  padding: 10px 0;
  & + * {
    margin-left: 20px;
  }
  white-space: nowrap;
  @media (min-width: 1000px) {
    display: block;
  }
`

const HeaderLinkA = styled.a`
  display: none;
  font-size: 20px;
  color: #111;
  text-decoration: none;
  padding: 10px 0;
  & + * {
    margin-left: 20px;
  }
  white-space: nowrap;
  @media (min-width: 1000px) {
    display: block;
  }
`

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const LogoLink = styled(Link)`
  margin: 0 auto;
  font-size: 0;
  width: 140px;
  @media (min-width: 1000px) {
    margin: 0;
    width: 180px;
  }
`

const Header = ({ headerLinks = [], siteTitle }) => {
  return (
    <StyledSection>
      {headerLinks.length > 0 && (
        <HamburgerMenu onClick={toggleMobileMenu}>
          <HamburgerTicks />
        </HamburgerMenu>
      )}
      <LogoLink className="logo-link" to="/">
        <LogoFullContainer>
          <LogoBlack alt={siteTitle} />
        </LogoFullContainer>
      </LogoLink>
      <Nav>
        {headerLinks.map(headerLink =>
          headerLink.target.charAt(0) === '/' ? (
            <HeaderLink key={headerLink.target} to={headerLink.target}>
              {headerLink.text}
            </HeaderLink>
          ) : (
            <HeaderLinkA href={headerLink.target} key={headerLink.target}>
              {headerLink.text}
            </HeaderLinkA>
          )
        )}
      </Nav>
      <MobileMenu headerLinks={headerLinks} siteTitle={siteTitle} toggleMobileMenu={toggleMobileMenu} />
    </StyledSection>
  )
}

export default Header
