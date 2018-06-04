import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 1000px) {
    overflow-y: scroll;
    width: 25vw;
  }
`

const SidebarContent = styled.div`
  flex-grow: 1;
`

const StyledFooter = styled.footer`
  margin: 55px 0 0 0;
`

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 0 1rem 0;
  padding: 0;
`

const StyledLi = styled.li`
  display: block;
  margin: 0 1rem 0.5rem 1rem;
`

const StyledP = styled.p`
  text-align: center;
  font-size: 0.8125em;
  margin: 0;
`

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledUl>
      <StyledLi>
        <Link to="/legal/terms">{'Terms & Conditions'}</Link>
      </StyledLi>
      <StyledLi>
        <Link to="/legal/imprint">{'Imprint'}</Link>
      </StyledLi>
      <StyledLi>
        <Link to="/legal/privacy">{'Privacy & Cookies'}</Link>
      </StyledLi>
      <StyledLi>
        <a href="mailto:hello@trendiamo.com">{'Contact Us'}</a>
      </StyledLi>
    </StyledUl>
    <StyledP>
      {'© 2018, '}
      <Link to="/">{'store.nondimension.com'}</Link>
      {' - All Rights Reserved'}
    </StyledP>
  </StyledFooter>
)

export { Container, Footer, Sidebar, SidebarContent }
