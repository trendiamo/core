import React from 'react'
import styled from 'styled-components'
import { CoverInner } from 'shared/cover/components'
import { TopSlideAnimation } from 'shared/animate'

const Title = styled.div`
  color: #fff;
  font-size: 22px;
  line-height: 1.4;
  .Win32 & {
    font-weight: 500;
  }
`

const SubTitle = styled.div`
  color: #fff;
  font-size: 14px;
  .Win32 & {
    font-weight: 500;
  }
`

const ShowcaseCover = ({ FlowBackButton, isLeaving, subtitle, title }) => (
  <CoverInner>
    {FlowBackButton && <FlowBackButton />}
    <TopSlideAnimation delay={250 * 0} isLeaving={isLeaving}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TopSlideAnimation>
  </CoverInner>
)

export default ShowcaseCover
