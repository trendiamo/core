import React from 'react'
import styled from 'styled-components'
import { IconPlaceholderPersona } from 'icons'

const EmptyPersonaPic = styled(({ className }) => <IconPlaceholderPersona className={className} />)`
  fill: #f2f4f7;
  margin-top: -2px;
  transform: ${({ active }) => (active ? 'none' : 'rotate(30deg) scale(0)')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

export default EmptyPersonaPic
