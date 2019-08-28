import BrandCard from './brand-card'
import React from 'react'
import styled from 'styled-components'

const BlankStateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  user-select: none;
`

const RocketIcon = styled.img`
  margin-bottom: 20px;
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
    <RocketIcon animate={animate} src="/img/icons/rocket.svg" />
    <BlankStateDescription animate={animate}>
      <div>{'You are not working with any brands yet.'}</div>
      <div>{'Pick partners from the list to start promoting and earning today!'}</div>
    </BlankStateDescription>
  </BlankStateContainer>
)

const ActiveBrands = ({ animate, brands, isLoading }) => {
  if (isLoading) return <div />

  if (brands.length === 0) return <BlankState animate={animate} />

  return brands.map(brand => <BrandCard animate={animate} brand={brand} key={brand.id} />)
}

export default ActiveBrands
