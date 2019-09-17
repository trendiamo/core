import BrandCard from './brand-card'
import omit from 'lodash.omit'
import React from 'react'
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

const AvailableBrands = ({ animate, brands, createAffiliation, isLoading, title, titleRef }) => {
  if (isLoading) return <div />

  return (
    <>
      {brands.length > 0 && (
        <div ref={titleRef}>
          <StyledTitle animate={animate}>{title}</StyledTitle>
        </div>
      )}
      {brands.map(brand => (
        <BrandCard animate={animate} brand={brand} createAffiliation={createAffiliation} key={brand.id} />
      ))}
    </>
  )
}

export default AvailableBrands
