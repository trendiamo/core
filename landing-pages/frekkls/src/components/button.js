import React from 'react'
import styled from 'styled-components'

const Button = styled(({ className, children, onClick }) => (
  <button className={className} onClick={onClick} type="button">
    <span>{children}</span>
  </button>
))`
  appearance: none;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  margin: 0 auto;
  outline: none;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;

  /* keep it vertically centered */
  span {
    vertical-align: middle;
  }

  font-size: 1.25vw;
  padding: 0.8vw 1vw;
  ${({ big }) =>
    big &&
    `
    @media (min-width: 800px) {
      font-size: 2vw;
      padding: 1vw 1.2vw;
      margin-top: 0.5vw;
    }
  `}

  background-color: ${({ bg }) => bg || 'transparent'};
  border: 2px solid ${({ color }) => color};
  color: ${({ color }) => color};
  text-shadow: ${({ bg }) => (bg ? '0 0 3px rgba(0,0,0,0.6)' : 'none')};

  &:hover,
  &:active {
    color: ${({ color }) => (color === '#fff' ? '#000' : '#fff')};
    background-color: ${({ color }) => color};
    text-shadow: none;
  }
`

export default Button
