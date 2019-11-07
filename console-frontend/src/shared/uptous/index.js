import omit from 'lodash.omit'
import Paper from 'shared/paper'
import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

export const MainCard = styled(Paper)`
  align-self: center;
  align-items: stretch;
  overflow: hidden;

  @media (min-width: 960px) {
    margin-right: 14px;
  }
`

export const CardContent = styled.div`
  padding: 40px 20px 30px;
  display: flex;
  flex-direction: column;

  @media (min-width: 960px) {
    padding: 40px;
  }
`

export const Callout = styled(({ children, ...props }) => (
  <div {...omit(props, ['bordered'])}>
    <div>{children}</div>
  </div>
))`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;

  @media (min-width: 960px) {
    padding: 0 40px 40px;
  }

  ${({ bordered = true }) =>
    bordered &&
    `
    padding: 0 20px;

    > div {
      width: 100%;
      padding: 30px 0 40px;
      border-top: 3px solid #e7ecef;
    }

    @media (min-width: 960px) {
      padding: 0 40px;
    }
  `}
`

export const CalloutTitle = styled(props => <Typography align="center" variant="h6" {...props} />)`
  margin-bottom: 20px;
`

const BrandLogoContainer = styled.div`
  border-radius: 8px;
  border: 2px solid #e7ecef;
  width: 110px;
  height: 110px;
  flex-shrink: 0;
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
