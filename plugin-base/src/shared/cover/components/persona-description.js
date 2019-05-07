import React from 'react'
import styled from 'styled-components'

const PersonaDescriptionContainer = styled.div`
  position: relative;
`

const PersonaDescriptionHelper = styled.div`
  color: transparent;
  font-size: 12px;
  user-select: none;
`

const PersonaDescriptionTyping = styled.div`
  color: #ddd;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
`

const PersonaDescription = ({ text, typingText }) => (
  <PersonaDescriptionContainer>
    <PersonaDescriptionHelper>{text}</PersonaDescriptionHelper>
    <PersonaDescriptionTyping>{typingText}</PersonaDescriptionTyping>
  </PersonaDescriptionContainer>
)

export default PersonaDescription
