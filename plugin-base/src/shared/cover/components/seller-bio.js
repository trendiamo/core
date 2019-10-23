import React, { useContext } from 'react'
import styled from 'styled-components'
import { ThemeContext } from 'ext'

const SellerBioContainer = styled.div`
  position: relative;
`

const SellerBioHelper = styled.div`
  color: transparent;
  font-size: 12px;
  user-select: none;
`

const SellerBioTyping = styled.div`
  color: ${({ theme }) => theme.textColor};
  opacity: 0.8;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 0;
`

const SellerBio = ({ text, typingText }) => {
  const theme = useContext(ThemeContext)

  return (
    <SellerBioContainer>
      <SellerBioHelper dangerouslySetInnerHTML={{ __html: text }} />
      <SellerBioTyping dangerouslySetInnerHTML={{ __html: typingText }} theme={theme} />
    </SellerBioContainer>
  )
}

export default SellerBio
