import ImpactPoint from './impact-point'
import Paper from 'shared/paper'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const MainCard = styled(Paper)`
  align-self: center;
  overflow: hidden;
  align-items: stretch;
  @media (min-width: 960px) {
    margin-right: 14px;
  }
`

export const CardContent = styled.div`
  padding: 40px 12px 40px;
  display: flex;
  flex-direction: column;
  @media (min-width: 960px) {
    padding: 60px 50px 40px;
  }
`

export const Callout = styled.div`
  background-color: #e7ecef;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 34px;
  @media (min-width: 960px) {
    padding: 2rem 3.75rem;
  }
`

export const CalloutTitle = styled(Typography)`
  @media (min-width: 960px) {
    margin-bottom: 20px;
  }
`

const BrandLogoContainer = styled.div`
  border-radius: 8px;
  border: 2px solid #e7ecef;
  width: 110px;
  height: 110px;
  background: #fff;
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
`

export const BrandLogo = ({ brand, ...props }) => (
  <BrandLogoContainer {...props}>
    <Logo src={brand.logoUrl} />
  </BrandLogoContainer>
)

export { ImpactPoint }
