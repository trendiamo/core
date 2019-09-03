import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Button from '../components/button'
import LogoBlack from '../images/logo-black.svg'
import MenuIcon from '../images/menu-icon.svg'
import MobileMenu from './mobile-menu'
import { openModal } from '../utils'

const StyledMenuIcon = styled(MenuIcon)``
const MenuIconContainer = styled.div``
const LogoFullContainer = styled.div``

const toggleMobileMenu = () => {
  document.body.classList.toggle('mobile-menu-open')
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

const Header = ({ className, headerLinks = [], siteTitle }, ref) => {
  const onClick = useCallback(event => {
    event.preventDefault()
    const element = document.querySelector(event.target.getAttribute('href'))
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const onCtaButtonClick = useCallback(() => {
    onSignupClick()
  }, [])

  return (
    <header className={className} ref={ref}>
      <Link className="logo-link" to="/">
        <LogoFullContainer>
          <LogoBlack alt={siteTitle} />
        </LogoFullContainer>
      </Link>
      <nav>
        {headerLinks.map(headerLink =>
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
        <Button color="#f05d5e" onClick={onCtaButtonClick}>
          {'Sign up'}
        </Button>
        {headerLinks.length > 0 && (
          <MenuIconContainer onClick={toggleMobileMenu}>
            <StyledMenuIcon />
          </MenuIconContainer>
        )}
      </nav>
      <MobileMenu headerLinks={headerLinks} siteTitle={siteTitle} toggleMobileMenu={toggleMobileMenu} />
    </header>
  )
}

const StyledHeader = styled(React.forwardRef(Header))`
  padding: 20px;
  position: absolute;
  width: 100vw;
  z-index: 1;
  align-items: flex-start;

  ${MenuIconContainer} {
    background-color: #262831;
    padding: 20px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  ${StyledMenuIcon} {
    width: 30px;
  }

  ${LogoFullContainer} {
    min-width: 100px;
    width: 25vw;
    max-width: 270px;
  }

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
  .logo-link {
    align-self: flex-end;
  }

  .logo-link img {
    width: 100px;
  }

  .header-link {
    font-size: calc(1rem + 0.25vw);
    font-weight: 900;
    color: ${({ headerColorScheme }) => (headerColorScheme === 'black-on-white' ? '#000' : '#fff')};
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 2vw;
    white-space: nowrap;
  }

  nav > ${Button} {
    display: none;
  }
  @media (min-width: 1000px) {
    padding: 30px 36px;
    ${MenuIconContainer} {
      display: none;
    }
    nav > ${Button} {
      display: block;
    }
    .header-link {
      display: block;
    }
    .logo-link img {
      width: 11vw;
    }
  }
`

export default StyledHeader
