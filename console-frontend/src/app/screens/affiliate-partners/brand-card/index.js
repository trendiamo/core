import Actions from './actions'
import ImageAndDescription from './image-and-description'
import mixpanel from 'ext/mixpanel'
import omit from 'lodash.omit'
import React, { useCallback } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'

const StyledSection = styled(props => <Section {...omit(props, ['animate'])} />)`
  transition: all 1s 0.2s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const MainContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media (min-width: 960px) {
    flex-direction: row;
    min-height: 140px;
  }
`

const BrandCard = ({
  affiliation,
  animate,
  brand,
  setIsCustomLinkModalOpen,
  setIsBrandModalOpen,
  setSelectedBrand,
}) => {
  const onClickCustomLink = useCallback(
    () => {
      mixpanel.track('Clicked Custom Link', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
      })
      setIsCustomLinkModalOpen(true)
      setSelectedBrand(brand)
    },
    [brand, setIsCustomLinkModalOpen, setSelectedBrand]
  )

  const openBrandModal = useCallback(
    () => {
      setIsBrandModalOpen(true)
      setSelectedBrand(brand)
    },
    [brand, setIsBrandModalOpen, setSelectedBrand]
  )

  const onClickBrandLogo = useCallback(
    () => {
      mixpanel.track('Clicked Brand Logo', {
        hostname: window.location.hostname,
        brandId: brand.id,
        brand: brand.name,
        token: affiliation && affiliation.token,
      })
      openBrandModal()
    },
    [affiliation, brand.id, brand.name, openBrandModal]
  )

  return (
    <StyledSection animate={animate} key={brand.id}>
      <MainContainer>
        <ImageAndDescription brand={brand} onClickBrandLogo={onClickBrandLogo} />
        <Actions
          affiliation={affiliation}
          brand={brand}
          onClickCustomLink={onClickCustomLink}
          openBrandModal={openBrandModal}
        />
      </MainContainer>
    </StyledSection>
  )
}

export default BrandCard
