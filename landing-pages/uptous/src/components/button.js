import React from 'react'
import styled from 'styled-components'

const Button = styled(({ className, children, onClick }) => (
  <button className={className} onClick={onClick} type="button">
    <span>{children}</span>
  </button>
))`
  appearance: none;
  border: 0;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  overflow: hidden;
  text-transform: uppercase;
  white-space: nowrap;
  /* keep it vertically centered */
  span {
    vertical-align: middle;
  }

  color: #fff;
  background: linear-gradient(to right, #12e5c4, #18e0aa);
  padding: 10px 40px;
  width: 100%;
  margin-bottom: 10px;

  @media (min-width: 1000px) {
    font-size: 1.1rem;
    padding-top: 16px;
    padding-bottom: 16px;
  }
`

export default Button
