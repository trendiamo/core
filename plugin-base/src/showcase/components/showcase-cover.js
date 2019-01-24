import React from 'react'
import styled from 'styled-components'
import { CoverInner } from 'shared/cover'
import { TopSlideAnimation } from 'shared/animate'

const Title = styled.div`
  font-size: 22px;
  line-height: 1.4;
`

const SubTitle = styled.div`
  font-size: 14px;
`

const ShowcaseCover = ({ FlowBackButton, isLeaving, subtitle, title }) => (
  <CoverInner>
    <FlowBackButton />
    <TopSlideAnimation delay={250 * 0} isLeaving={isLeaving}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TopSlideAnimation>
  </CoverInner>
)

export default ShowcaseCover
