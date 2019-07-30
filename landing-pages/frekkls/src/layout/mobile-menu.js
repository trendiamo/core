import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from '../components/button'
import CloseIcon from '../images/close-icon.svg'
import LogoGrey from '../images/logo-grey.svg'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.96);
  z-index: 1;

  display: none;
  @media (max-width: 899px) {
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

  ${Button} {
    font-size: 20px;
    padding: 20px 30px;
    margin-top: 1rem;
    color: #f75c35;
    border-color: #f75c35;

    &:hover {
      background-color: #f75c35;
      color: #fff;
    }
  }
`

const StyledCloseIcon = styled.img.attrs({
  src: CloseIcon,
})`
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  width: 80%;

  a {
    text-decoration: none;
    font-size: 40px;
    line-height: 2;
    color: #000;
    text-transform: uppercase;
  }
`

const removeMobileMenu = () => {
  document.body.classList.remove('mobile-menu-open')
}

const MobileMenu = ({ hasGetStarted, headerLinks, siteTitle, toggleMobileMenu }) => {
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
    window.frekklsOpenDemoModal()
  }, [toggleMobileMenu])

  return (
    <Container className="mobile-menu">
      <Link onClick={removeMobileMenu} to="/">
        <img alt={siteTitle} src={LogoGrey} />
      </Link>
      <StyledCloseIcon onClick={toggleMobileMenu} />
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
        {hasGetStarted && (
          <Button color="#000" onClick={onCtaButtonClick}>
            {'Get Started'}
          </Button>
        )}
      </Content>
    </Container>
  )
}

export default MobileMenu
