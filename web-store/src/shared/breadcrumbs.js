import IconBreadcrumb from 'icons/breadcrumb'
import { Link } from 'react-router-dom'
import React from 'react'
import { SmallButton } from './buttons'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: -16px;
  font-size: 12px;
`

const StyledLink1 = styled(Link)`
  color: white;
`

const StyledLink2 = styled(Link)`
  margin-left: 8px;
  text-transform: uppercase;
  color: #999;
`

const StyledIcon = styled(IconBreadcrumb)`
  height: 8px;
  fill: #b8b8b8;
  margin: 0 6px;
`

const Title = styled.div`
  text-transform: uppercase;
  color: #666;
`

const Breadcrumbs = ({ title }) => (
  <StyledDiv>
    <SmallButton>
      <StyledLink1 to="/">{'‹ Back'}</StyledLink1>
    </SmallButton>
    <StyledLink2 to="/">{'All products'}</StyledLink2>
    <StyledIcon />
    <Title>{title}</Title>
  </StyledDiv>
)

export default Breadcrumbs
