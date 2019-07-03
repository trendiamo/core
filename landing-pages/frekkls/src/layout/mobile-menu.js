import React, { useCallback } from 'react'
import styled from 'styled-components'

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
      display: block;
    }
  }

  .mobile-menu-link {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.9);
    font-size: 32px;
    display: block;
    text-align: center;
    padding: 10px;
  }

  a img {
    margin-top: 23px;
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
  height: 35px;
  cursor: pointer;
  position: absolute;
  top: 17px;
  right: 37px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;

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

const MobileMenu = ({ siteTitle, toggleMobileMenu }) => {
  const onClick = useCallback(event => {
    event.preventDefault()
    toggleMobileMenu()
    const element = document.querySelector(event.target.getAttribute('href'))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  })

  const onButtonClick = useCallback(() => {
    toggleMobileMenu()
  }, [])

  return (
    <Container className="mobile-menu">
      <a href="/" onClick={removeMobileMenu}>
        <img alt={siteTitle} src={LogoGrey} />
      </a>
      <StyledCloseIcon onClick={toggleMobileMenu} />
      <Content>
        <a href="#what-you-get" onClick={onClick}>
          {'What you get'}
        </a>
        <a href="#product" onClick={onClick}>
          {'Product'}
        </a>
        <a href="#pricing" onClick={onClick}>
          {'Pricing'}
        </a>
        <Button className="js-request-demo" color="#000" onClick={onButtonClick}>
          {'Get Started'}
        </Button>
      </Content>
    </Container>
  )
}

export default MobileMenu
