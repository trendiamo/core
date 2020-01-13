import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  appearance: none;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-weight: 900;
  outline: none;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
  height: 38px;
  font-size: calc(15px + 1vw);

  background: transparent;
  color: ${({ color }) => color || '#fff'};

  @media (min-width: 1000px) {
    font-size: 1.25rem;
  }
`

const VerticallyCenteredSpan = styled.span`
  /* keep it vertically centered */

  vertical-align: middle;
  line-height: 38px;
`

const Button = ({ children, className, onClick }) => (
  <StyledButton className={className} onClick={onClick} type="button">
    <VerticallyCenteredSpan>{children}</VerticallyCenteredSpan>
  </StyledButton>
)

export default Button
