import IconCart from 'icons/cart'
import IconHamburger from 'icons/hamburger'
import IconLogin from 'icons/login'
import IconSearch from 'icons/search'
import { Link } from 'react-router-dom'
import React from 'react'
import SubscribeButton from '../subscribe/subscribe-button'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`

const Description = styled.p`
  color: #222;
`

const Sidebar = styled.div`
  width: 100vw;
  height: auto;
  padding: 1rem;

  @media (min-width: 1000px) {
    overflow-y: scroll;
    width: 25vw;
    height: calc(100vh - 50px);
    display: flex;
    flex-direction: column;
  }
`

const SidebarContent = styled.div`
  flex-grow: 1;
`

const MainContent = styled.div`
  background-color: #f0f0f0;
  flex-grow: 1;

  ${({ fullWidth }) =>
    fullWidth ||
    css(`
    @media (min-width: 1000px) {
      position: relative;
      width: 75vw;
      height: calc(100vh - 50px);
      overflow: hidden;
    }
  `)};
`

const StyledFooter = styled.footer`
  margin: 55px 0 0 0;
  padding: ${({ main }) => (main ? '1rem' : '0')};
  display: ${({ main }) => (main ? 'block' : 'none')};

  @media (min-width: 1000px) {
    display: ${({ main }) => (main ? 'none' : 'block')};
  }
`

const Cols = styled.div`
  margin: 0 0 1rem 0;
  display: flex;
  flex-wrap: wrap;
  a {
    display: block;
    margin-right: 1rem;
    white-space: nowrap;
  }
`

const StyledP = styled.p`
  text-align: center;
  font-size: 0.8125em;
  margin: 0;
`

const Footer = ({ main }) => (
  <StyledFooter main={main} role="contentinfo">
    <Cols>
      <Link to="/legal/terms">{'Terms & Conditions'}</Link>
      <Link to="/legal/privacy">{'Privacy & Cookies'}</Link>
      <Link to="/legal/imprint">{'Imprint'}</Link>
      <a href="mailto:hello@trendiamo.com">{'Contact Us'}</a>
    </Cols>
    <StyledP>{'© 2018 Trendiamo Unipessoal Lda.'}</StyledP>
  </StyledFooter>
)

const StyledTopbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 50px;
  border-bottom: 1px solid #e8e9eb;
`

const TopbarSide = styled.div`
  display: flex;
  align-items: center;
`

const IconContainer = styled.div`
  height: 20px;
  width: 20px;
  margin-left: ${({ first }) => (first ? '0' : '10px')};
  margin-right: ${({ first }) => (first ? '10px' : '0')};

  svg {
    width: 100%;
    height: 100%;
  }
`

const Logo = styled.img`
  max-width: 160px;
  object-fit: contain;
  vertical-align: middle;
`

const Topbar = () => (
  <StyledTopbar>
    <TopbarSide>
      <IconContainer first>
        <IconHamburger />
      </IconContainer>
      <Link to="/">
        <Logo alt="" src="/logo_beta.png" />
      </Link>
    </TopbarSide>
    <TopbarSide>
      <SubscribeButton />
      <IconContainer>
        <IconSearch />
      </IconContainer>
      <IconContainer>
        <IconLogin />
      </IconContainer>
      <IconContainer>
        <IconCart />
      </IconContainer>
    </TopbarSide>
  </StyledTopbar>
)

export { Container, Description, Footer, MainContent, Sidebar, SidebarContent, Topbar }
