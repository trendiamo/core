import BrandCard from './brand-card'
import React, { useMemo } from 'react'
import VerticalGrid from './vertical-grid'

const BrandsComingSoon = ({ animate, brands, isLoading, interests, goToBrandPage }) => {
  const brandsToShow = useMemo(() => brands.filter(brand => brand.isPreview), [brands])

  if (isLoading || brandsToShow.length === 0) return null

  return (
    <VerticalGrid>
      {brandsToShow.map(brand => (
        <BrandCard animate={animate} brand={brand} goToBrandPage={goToBrandPage} interests={interests} key={brand.id} />
      ))}
    </VerticalGrid>
  )
}

export default BrandsComingSoon
