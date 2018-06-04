import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  margin: 55px 0;
`

const StyledP = styled.p`
  text-align: center;
  font-size: 0.8125em;
  margin: 0;
`

const StyledUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 0 2rem 0;
  padding: 0;
`

const StyledLi = styled.li`
  display: block;
  margin: 0 1rem 0.5rem 1rem;
`

const Footer = () => (
  <StyledFooter role="contentinfo">
    <StyledUl>
      <StyledLi>
        <a>{'Terms & Conditions'}</a>
      </StyledLi>
      <StyledLi>
        <a>{'Imprint'}</a>
      </StyledLi>
      <StyledLi>
        <a>{'Privacy & Cookies'}</a>
      </StyledLi>
      <StyledLi>
        <a href="mailto:hello@trendiamo.com">{'Contact Us'}</a>
      </StyledLi>
    </StyledUl>
    <StyledP>
      {'© 2018, '}
      <a href="/">{'Trendiamo'}</a>
    </StyledP>
  </StyledFooter>
)

export default Footer
