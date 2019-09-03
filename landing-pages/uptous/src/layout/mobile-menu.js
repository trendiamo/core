import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from '../components/button'
import CloseIcon from '../images/close-icon.svg'
import LogoFullImg from '../images/logo-full'
import { openModal } from '../utils'

const LogoFullContainer = styled.div``
const CloseIconContainer = styled.div`
  background-color: #262831;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #262831;
  z-index: 1;

  display: none;
  @media (max-width: 999px) {
    body.mobile-menu-open & {
      display: flex;
      flex-direction: column;
    }
  }
  align-items: center;

  .mobile-menu-link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.9);
    font-size: 32px;
    display: block;
    text-align: center;
    padding: 10px;
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

const StyledCloseIcon = styled(CloseIcon)`
  height: 30px;
  width: 30px;
  fill: #fff;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  width: 100vw;
  justify-content: center;

  a {
    text-decoration: none;
    font-weight: 900;
    font-size: 1.25rem;
    line-height: 2;
    color: #fff;
    text-transform: uppercase;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const removeMobileMenu = () => {
  document.body.classList.remove('mobile-menu-open')
}

const onSignupClick = () => {
  if (!window.hbspt) return
  openModal('.get-started-modal-content')
  window.hbspt.forms.create({
    css: '',
    portalId: '5559593',
    formId: 'd2106863-b4fd-4591-a806-7411e7798762',
    target: '.get-started-modal-form',
  })
}

const MobileMenu = ({ headerLinks, siteTitle, toggleMobileMenu }) => {
  const onClick = useCallback(
    event => {
      event.preventDefault()
      toggleMobileMenu()
      const element = document.querySelector(event.target.getAttribute('href'))
      if (!element) return
      element.scrollIntoView({ behavior: 'smooth' })
    },
    [toggleMobileMenu]
  )

  const onCtaButtonClick = useCallback(() => {
    toggleMobileMenu()
    onSignupClick()
  }, [toggleMobileMenu])

  return (
    <Container className="mobile-menu">
      <Link onClick={removeMobileMenu} to="/">
        <LogoFullContainer>
          <LogoFullImg alt={siteTitle} />
        </LogoFullContainer>
      </Link>
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
            <a href={headerLink.target} key={headerLink.target} onClick={onClick}>
              {headerLink.text}
            </a>
          )
        )}
        <Button color="#f05d5e" onClick={onCtaButtonClick}>
          {'Get Started'}
        </Button>
      </Content>
    </Container>
  )
}

export default MobileMenu
