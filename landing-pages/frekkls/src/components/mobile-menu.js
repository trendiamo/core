import Button from './button'
import CloseIcon from '../images/close-icon.svg'
import locales from '../../locales'
import Logo from '../images/logo'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.96);
  z-index: 1000;
  display: none;
  padding-top: 50px;
  @media (max-width: 900px) {
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
`

const StyledOutlineButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: block !important;
`

const StyledCloseIcon = styled.img.attrs({
  src: CloseIcon,
})`
  height: 35px;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 20px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 40px;
`

const removeMobileMenu = () => {
  document.body.classList.remove('mobile-menu-open')
}

const MobileMenu = ({ siteTitle, toggleMobileMenu, locale, layout }) => (
  <Container className="mobile-menu">
    <Link onClick={removeMobileMenu} to={`${locales[locale].path}/`}>
      <Logo
        alt={siteTitle}
        style={{
          position: 'absolute',
          top: '30px',
          left: '20px',
        }}
      />
    </Link>
    <StyledCloseIcon onClick={toggleMobileMenu} />
    <Content>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/`}>
        {'Home'}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/features`}>
        {layout.features}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/about`}>
        {layout.about}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/demo`}>
        {layout.demo}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/blog`}>
        {layout.blog}
      </Link>
      <a className="mobile-menu-link" href="mailto:hello@trendiamo.com">
        {layout.contact}
      </a>
      <StyledOutlineButton className="js-request-demo" style={{ fontSize: '20px', padding: '14px' }}>
        {layout.tryNow}
      </StyledOutlineButton>
    </Content>
  </Container>
)

export default MobileMenu
