import BrandCard from './brand-card'
import omit from 'lodash.omit'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import Title from 'shared/main-title'

const StyledTitle = styled(props => <Title {...omit(props, ['animate', 'ref'])} />)`
  margin: 20px 0;
  transition: all 1s 0.1s;
  ${({ animate }) =>
    !animate &&
    `
    opacity: 0;
    transform: translateY(10px);
  `}
`

const BrandsComingSoon = ({
  animate,
  brands,
  isLoading,
  interests,
  title,
  titleRef,
  setIsBrandModalOpen,
  setSelectedBrand,
  removeInterest,
}) => {
  const brandsToShow = useMemo(() => brands.filter(brand => brand.isPreview), [brands])

  if (isLoading || brandsToShow.length === 0) return null

  return (
    <>
      <div ref={titleRef}>
        <StyledTitle animate={animate}>{title}</StyledTitle>
      </div>
      {brandsToShow.map(brand => (
        <BrandCard
          animate={animate}
          brand={brand}
          interests={interests}
          key={brand.id}
          removeInterest={removeInterest}
          setIsBrandModalOpen={setIsBrandModalOpen}
          setSelectedBrand={setSelectedBrand}
        />
      ))}
    </>
  )
}

export default BrandsComingSoon
