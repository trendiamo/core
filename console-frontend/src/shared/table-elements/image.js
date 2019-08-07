import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  vertical-align: middle;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  margin-right: 8px;
  object-fit: cover;
`

const Image = ({ src, disabled }) => <Img alt="" disabled={disabled} src={src} />

export default Image
