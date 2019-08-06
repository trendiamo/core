import React, { useContext } from 'react'
import styled from 'styled-components'
import { CoverInner } from 'shared/cover/components'
import { ThemeContext } from 'ext'
import { TopSlideAnimation } from 'shared'

const Heading = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 22px;
  line-height: 1.4;
  .Win32 & {
    font-weight: 500;
  }
`

const SubHeading = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 14px;
  .Win32 & {
    font-weight: 500;
  }
`

const ShowcaseCover = ({ FlowBackButton, isLeaving, subheading, heading }) => {
  const theme = useContext(ThemeContext)

  return (
    <CoverInner>
      {FlowBackButton && <FlowBackButton />}
      <TopSlideAnimation delay={250 * 0} isLeaving={isLeaving}>
        <Heading theme={theme}>{heading}</Heading>
        <SubHeading theme={theme}>{subheading}</SubHeading>
      </TopSlideAnimation>
    </CoverInner>
  )
}

export default ShowcaseCover
