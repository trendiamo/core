import React from 'react'
import styled from 'styled-components'
import useIsEntering from './use-is-entering'

const StyledDiv = styled.div`
  opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
  transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(20px)' : 'none')};
  transition: opacity 0.25s ease, transform 0.25s ease;
`

const TopSlideAnimation = ({ children, delay, isLeaving }) => {
  const isEntering = useIsEntering(delay)

  return (
    <StyledDiv isEntering={isEntering} isLeaving={isLeaving}>
      {children}
    </StyledDiv>
  )
}

export default TopSlideAnimation