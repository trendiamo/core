import React from 'react'
import styled from 'styled-components'

const Button = styled(({ children, className, onClick }) => (
  <button className={className} onClick={onClick} type="button">
    <span>{children}</span>
  </button>
))`
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

  /* keep it vertically centered */
  span {
    vertical-align: middle;
    line-height: 38px;
  }

  background: transparent;
  color: ${({ color }) => color || '#fff'};

  @media (min-width: 1000px) {
    font-size: 1.25rem;
  }
`

export default Button
