import LogoBlack from '../images/logo.svg'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const LogoFullContainer = styled.div`
  width: 100%;
  padding: 45px 80px;
`

const LogoWhite = styled(LogoBlack)`
  filter: invert();
`

const CloseIconContainer = styled.div`
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  text-align: center;
  line-height: 32px;
  opacity: 0.7;
  transition: all 0.3s cubic-bezier(0.32, 0.74, 0.57, 1);

  position: absolute;
  top: 5px;
  right: 5px;
  bottom: auto;
  left: auto;
  z-index: 100;
`

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  background: #111;
  z-index: 9900;
  visibility: hidden;
  align-items: center;
  transform: translateX(-310px);
  transition: all 0.3s cubic-bezier(0.32, 0.74, 0.57, 1);

  @media (max-width: 999px) {
    body.mobile-menu-open & {
      visibility: visible;
      display: flex;
      flex-direction: column;
      transform: translateX(0px);
    }
  }

  > a {
    align-self: flex-start;
  }

  a img {
    margin-top: 16px;
    margin-left: 32px;
    width: 100px;
  }
`

const StyledCloseIcon = styled.i`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    margin-top: -1px;
    margin-left: -10px;
    width: 20px;
    height: 1px;
    background-color: #fff;
  }
  &:before {
    transform: rotate(-45deg);
  }
  &:after {
    transform: rotate(45deg);
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 10px 0 0 40px;

  a {
    text-decoration: none;
    font-size: 20px;
    color: #fff;
    margin: 14px 0;
  }
`

const Overlay = styled.div`
  position: fixed;
  display: none;
  top: -200%;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  transition: background 0.4s cubic-bezier(0.32, 0.74, 0.57, 1), visibility 0.4s cubic-bezier(0.32, 0.74, 0.57, 1);
  @media (max-width: 999px) {
    display: block;
    body.mobile-menu-open & {
      top: 0;
      visibility: visible;
      background: rgba(255, 255, 255, 0.9);
      pointer-events: auto;
    }
  }
`

const StyledLink = styled(Link)`
  width: 100%;
  display: block;
`

const removeMobileMenu = () => {
  document.body.classList.remove('mobile-menu-open')
}

const MobileMenu = ({ headerLinks, siteTitle, toggleMobileMenu }) => {
  const onOverlayClick = useCallback(() => {
    removeMobileMenu()
  }, [])

  return (
    <>
      <Overlay onClick={onOverlayClick} />
      <Container>
        <StyledLink onClick={removeMobileMenu} to="/">
          <LogoFullContainer>
            <LogoWhite alt={siteTitle} />
          </LogoFullContainer>
        </StyledLink>
        <CloseIconContainer onClick={toggleMobileMenu}>
          <StyledCloseIcon />
        </CloseIconContainer>
        <Content>
          {(headerLinks || []).map(headerLink =>
            headerLink.target.charAt(0) === '/' ? (
              <Link key={headerLink.target} onClick={removeMobileMenu} to={headerLink.target}>
                {headerLink.text}
              </Link>
            ) : (
              <a href={headerLink.target} key={headerLink.target}>
                {headerLink.text}
              </a>
            )
          )}
        </Content>
      </Container>
    </>
  )
}

export default MobileMenu
