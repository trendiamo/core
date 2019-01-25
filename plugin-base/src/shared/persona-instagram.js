import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing } from 'recompose'
import { IconInstagram } from 'icons'

const Link = styled.a`
  outline: none;
  margin-left: 4px;
`

const Container = styled.div`
  width: ${({ size }) => size || '18px'};
  height: ${({ size }) => size || '18px'};
  border-radius: 4px;
  padding: 3px;
  margin-top: 0.5px;
  display: inline-block;
  opacity: 0;
  animation: _frekkls_instagram_transition 1s;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;
  &:hover {
    background: transparent;
    svg {
      fill: ${({ color }) => (color === 'black' ? '#666' : '#a6a6a6')};
    }
  }
  &:active {
    background: ${({ color }) => (color === 'black' ? 'transparent' : '#888')};
  }
  svg {
    fill: ${({ color }) => (color === 'black' ? '#333' : '#fff')};
  }

  @keyframes _frekkls_instagram_transition {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const PersonaInstagram = compose(branch(({ url }) => !url, renderNothing))(({ url, color, size }) => (
  <Link href={url} rel="noopener noreferrer" target="_blank">
    <Container color={color} size={size}>
      <IconInstagram />
    </Container>
  </Link>
))

export default PersonaInstagram
