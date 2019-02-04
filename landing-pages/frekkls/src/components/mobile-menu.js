import CloseIcon from '../images/close-icon.svg'
import LangSelector from './lang-selector'
import locales from '../../locales'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { OutlineButton } from './button'

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
  @media (max-width: 530px) {
    body.mobile-menu-open & {
      display: block;
    }
  }
  .mobile-menu-link {
    text-decoration: none;
    color: #ff543c;
    font-size: 28px;
    display: block;
    text-align: center;
    padding: 10px;
  }
`

const StyledLangSelector = styled(LangSelector)`
  text-align: center;
  padding: 15px;
  position: relative;
  ul {
    width: auto;
    min-width: 100px;
  }
  img {
    vertical-align: bottom;
    margin-bottom: 6px;
    margin-left: 20px;
    margin-right: 6px;
    fill: #fb0;
  }
  input {
    font-size: 22px;
    color: #ff543c;
  }
  a {
    font-size: 20px;
  }
  li {
    padding: 0 15px;
  }
`

const StyledOutlineButton = styled(OutlineButton)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  padding: 20px;
`

const StyledCloseIcon = styled.img.attrs({
  src: CloseIcon,
})`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`

const LangContainer = styled.div`
  text-align: center;
`

const Content = styled.div`
  text-align: center;
`

const removeMobileMenu = () => {
  document.body.classList.remove('mobile-menu-open')
}

const MobileMenu = ({ toggleMobileMenu, locale, layout }) => (
  <Container className="mobile-menu">
    <StyledCloseIcon onClick={toggleMobileMenu} />
    <Content>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/`}>
        {'Home'}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/demo`}>
        {layout.demo}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/about`}>
        {layout.about}
      </Link>
      <Link className="mobile-menu-link" onClick={removeMobileMenu} to={`${locales[locale].path}/blog`}>
        {layout.blog}
      </Link>
      <a className="mobile-menu-link" href="mailto:hello@trendiamo.com">
        {layout.contact}
      </a>
      <LangContainer>
        <StyledLangSelector locale={locale} orange />
      </LangContainer>
      <StyledOutlineButton className="js-request-demo">{layout.tryNow}</StyledOutlineButton>
    </Content>
  </Container>
)

export default MobileMenu
