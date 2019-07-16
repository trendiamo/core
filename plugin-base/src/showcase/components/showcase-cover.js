import React, { useContext } from 'react'
import styled from 'styled-components'
import { CoverInner } from 'shared/cover/components'
import { ThemeContext } from 'ext'
import { TopSlideAnimation } from 'shared'

const Title = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 22px;
  line-height: 1.4;
  .Win32 & {
    font-weight: 500;
  }
`

const SubTitle = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  .Win32 & {
    font-weight: 500;
  }
`

const ShowcaseCover = ({ FlowBackButton, isLeaving, subtitle, title }) => {
  const theme = useContext(ThemeContext)

  return (
    <CoverInner>
      {FlowBackButton && <FlowBackButton />}
      <TopSlideAnimation delay={250 * 0} isLeaving={isLeaving}>
        <Title theme={theme}>{title}</Title>
        <SubTitle theme={theme}>{subtitle}</SubTitle>
      </TopSlideAnimation>
    </CoverInner>
  )
}

export default ShowcaseCover
