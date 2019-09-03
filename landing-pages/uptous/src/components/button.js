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
  font-size: 1.25rem;
  cursor: pointer;
  font-weight: 900;
  outline: none;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
  height: 38px;

  /* keep it vertically centered */
  span {
    vertical-align: top;
    line-height: 38px;
  }

  background: transparent;
  color: ${({ color }) => color || '#fff'};
`

export default Button
