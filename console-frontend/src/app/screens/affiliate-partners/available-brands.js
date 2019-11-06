import BrandCard from './brand-card'
import React from 'react'
import VerticalGrid from './vertical-grid'

const AvailableBrands = ({ animate, brandsToShow, isLoading, goToBrandPage }) => {
  if (isLoading) return null

  return (
    <VerticalGrid>
      {brandsToShow.map(brand => (
        <BrandCard animate={animate} brand={brand} goToBrandPage={goToBrandPage} key={brand.id} />
      ))}
    </VerticalGrid>
  )
}

export default AvailableBrands
