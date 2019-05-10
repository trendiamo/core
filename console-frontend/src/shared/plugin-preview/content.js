import omit from 'lodash.omit'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ContentWrapper, FrameBase } from 'plugin-base'

const StyledFrameBase = styled(props => <FrameBase {...omit(props, ['isEntry', 'isUnmounting'])} />)`
  border: 0;
  overflow: hidden;
  border-radius: 8px;
  width: 360px;
  height: 500px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  position: relative;
  margin-bottom: 30px;
  opacity: ${({ isEntry }) => (isEntry ? 0 : 1)};
  transform: ${({ isEntry, isUnmounting }) => (isEntry || isUnmounting ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.4s ease;
  z-index: 10;
`

const ContentContainer = ({ iframeRef, children }) => {
  const [isEntry, setIsEntry] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsEntry(false)
    }, 10)
  }, [])

  return (
    <StyledFrameBase iframeRef={iframeRef} isEntry={isEntry}>
      {children}
    </StyledFrameBase>
  )
}

const Content = ({ Base, showingContent }) => {
  const contentRef = useRef
  if (!showingContent) return null

  return (
    <ContentContainer iframeRef={contentRef}>
      <ContentWrapper>{Base}</ContentWrapper>
    </ContentContainer>
  )
}

export default Content
