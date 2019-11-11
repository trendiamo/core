import omit from 'lodash.omit'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ContentWrapper, Frame } from 'plugin-base'

const FilteredFrame = (props, ref) => <Frame {...omit(props, ['isEntry', 'isUnmounting', 'pluginTheme'])} ref={ref} />

const StyledFrame = styled(forwardRef(FilteredFrame))`
  border: 0;
  overflow: hidden;
  border-radius: ${({ pluginTheme }) => (pluginTheme.roundEdges ? '8px' : '0')};
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

const ContentContainer = ({ children, pluginTheme }) => {
  const [isEntry, setIsEntry] = useState(true)
  const ref = useRef()

  useEffect(() => {
    setTimeout(() => setIsEntry(false), 10)
  }, [])

  return (
    <StyledFrame isEntry={isEntry} pluginTheme={pluginTheme} ref={ref}>
      {children}
    </StyledFrame>
  )
}

const Content = ({ Base, pluginTheme, showingContent }) => {
  if (!showingContent) return null

  return (
    <ContentContainer pluginTheme={pluginTheme}>
      <ContentWrapper>{Base}</ContentWrapper>
    </ContentContainer>
  )
}

export default Content
