import BrandCard from './brand-card'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import VerticalGrid from './vertical-grid'
import { ReactComponent as SeedingIcon } from 'assets/icons/seeding.svg'

const BlankStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  user-select: none;
`

const StyledSeedingIcon = styled(props => <SeedingIcon {...omit(props, ['animate'])} />)`
  margin-bottom: 10px;
  transition: all 1.6s;
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
    <StyledSeedingIcon animate={animate} />
    <BlankStateDescription animate={animate}>
      <div>{'You are not working with any brands yet.'}</div>
      <div>{'Pick partners from the list to start promoting and earning today!'}</div>
    </BlankStateDescription>
  </BlankStateContainer>
)

const ActiveBrands = ({
  affiliations,
  setIsBrandModalOpen,
  animate,
  isLoading,
  setIsCustomLinkModalOpen,
  setSelectedBrand,
}) => {
  if (isLoading) return <div />

  if (affiliations.length === 0) return <BlankState animate={animate} />

  return (
    <VerticalGrid>
      {affiliations.map(affiliation => (
        <BrandCard
          affiliation={affiliation}
          animate={animate}
          brand={affiliation.brand}
          key={affiliation.id}
          setIsBrandModalOpen={setIsBrandModalOpen}
          setIsCustomLinkModalOpen={setIsCustomLinkModalOpen}
          setSelectedBrand={setSelectedBrand}
        />
      ))}
    </VerticalGrid>
  )
}

export default ActiveBrands
