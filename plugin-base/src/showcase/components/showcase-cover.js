import Arrow from 'shared/arrow'
import React from 'react'
import styled from 'styled-components'
import { animate, TopSlideAnimation } from 'shared/animate'

const AnimatedWhiteArrow = animate(
  styled(Arrow).attrs({
    color: '#fff',
    lineColor: '#aaa',
    width: '100px',
  })`
    opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
    transform: ${({ isEntering, isLeaving }) =>
      isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
    transition: opacity 1s ease, transform 0.6s ease;
  `
)

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 135px;
`

const Title = styled.div`
  font-size: 22px;
  line-height: 1.4;
`

const SubTitle = styled.div`
  font-size: 14px;
`

const ShowcaseCover = ({ isLeaving, subtitle, title }) => (
  <div>
    <TopSlideAnimation delay={250 * 0} isLeaving={isLeaving}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TopSlideAnimation>
    <ArrowContainer>
      <AnimatedWhiteArrow delay={250 * 2} isLeaving={isLeaving} />
    </ArrowContainer>
  </div>
)

export default ShowcaseCover
