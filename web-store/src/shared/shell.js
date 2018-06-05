import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`

const Description = styled.p`
  color: #222;
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

const Cols = styled.div`
  margin: 0 0 1rem 0;
  @media (min-width: 1250px) {
    display: flex;
    justify-content: space-between;
  }
  a {
    display: block;
  }
`

const StyledP = styled.p`
  text-align: center;
  font-size: 0.8125em;
  margin: 0;
`

const Footer = () => (
  <StyledFooter role="contentinfo">
    <Cols>
      <div>
        <Link to="/legal/terms">{'Terms & Conditions'}</Link>
        <Link to="/legal/privacy">{'Privacy & Cookies'}</Link>
      </div>
      <div>
        <Link to="/legal/imprint">{'Imprint'}</Link>
        <a href="mailto:hello@trendiamo.com">{'Contact Us'}</a>
      </div>
    </Cols>
    <StyledP>
      {'© 2018, '}
      <Link to="/">{'store.nondimension.com'}</Link>
      {' - All Rights Reserved'}
    </StyledP>
  </StyledFooter>
)

export { Container, Description, Footer, Sidebar, SidebarContent }
