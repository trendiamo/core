import BrandCard from './brand-card'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import VerticalGrid from './vertical-grid'
import { ReactComponent as SproutIcon } from 'assets/icons/sprout.svg'

const BlankStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
`

const StyledSproutIcon = styled(props => <SproutIcon {...omit(props, ['animate'])} />)`
  margin-bottom: 10px;
  transition: all 1.6s;
  width: 80px;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(30px);
  `}
`

const BlankStateDescription = styled.div`
  color: #8799a4;
  text-align: center;
  transition: all 1.6s 0.2s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(30px);
  `}
`

const BlankState = ({ animate }) => (
  <BlankStateContainer>
    <StyledSproutIcon animate={animate} />
    <BlankStateDescription animate={animate}>
      <div>{'You are not promoting any brands yet.'}</div>
      <div>{'Pick one from the list below to start spreading their impact and earn today!'}</div>
    </BlankStateDescription>
  </BlankStateContainer>
)

const ActiveBrands = ({ affiliations, animate, goToBrandPage, isLoading }) => {
  if (isLoading) return <div />

  if (affiliations.length === 0) return <BlankState animate={animate} />

  return (
    <VerticalGrid>
      {affiliations.map(affiliation => (
        <BrandCard
          affiliation={affiliation}
          animate={animate}
          brand={affiliation.brand}
          goToBrandPage={goToBrandPage}
          key={affiliation.id}
        />
      ))}
    </VerticalGrid>
  )
}

export default ActiveBrands
