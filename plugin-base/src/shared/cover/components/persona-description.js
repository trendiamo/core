import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'ext'

const PersonaDescriptionContainer = styled.div`
  position: relative;
`

const PersonaDescriptionHelper = styled.div`
  color: transparent;
  font-size: 12px;
  user-select: none;
`

const PersonaDescriptionTyping = styled.div`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
`

const PersonaDescription = ({ text, typingText }) => {
  const theme = useContext(ThemeContext)

  return (
    <PersonaDescriptionContainer>
      <PersonaDescriptionHelper>{text}</PersonaDescriptionHelper>
      <PersonaDescriptionTyping theme={theme}>{typingText}</PersonaDescriptionTyping>
    </PersonaDescriptionContainer>
  )
}

export default PersonaDescription
