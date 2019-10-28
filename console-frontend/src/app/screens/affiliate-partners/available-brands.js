import BrandCard from './brand-card'
import React from 'react'
import VerticalGrid from './vertical-grid'

const AvailableBrands = ({ animate, brandsToShow, isLoading, setIsBrandModalOpen, setSelectedBrand }) => {
  if (isLoading) return null

  return (
    <VerticalGrid>
      {brandsToShow.map(brand => (
        <BrandCard
          animate={animate}
          brand={brand}
          key={brand.id}
          setIsBrandModalOpen={setIsBrandModalOpen}
          setSelectedBrand={setSelectedBrand}
        />
      ))}
    </VerticalGrid>
  )
}

export default AvailableBrands
