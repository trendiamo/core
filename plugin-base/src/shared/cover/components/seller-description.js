import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'ext'

const SellerDescriptionContainer = styled.div`
  position: relative;
`

const SellerDescriptionHelper = styled.div`
  color: transparent;
  font-size: 12px;
  user-select: none;
`

const SellerDescriptionTyping = styled.div`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
`

const SellerDescription = ({ text, typingText }) => {
  const theme = useContext(ThemeContext)

  return (
    <SellerDescriptionContainer>
      <SellerDescriptionHelper>{text}</SellerDescriptionHelper>
      <SellerDescriptionTyping theme={theme}>{typingText}</SellerDescriptionTyping>
    </SellerDescriptionContainer>
  )
}

export default SellerDescription
