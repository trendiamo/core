import IconBreadcrumb from '../icons/breadcrumb'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
`

const StyledLink = styled(Link)`
  text-transform: uppercase;
  color: #999;
`

const StyledIcon = styled(IconBreadcrumb)`
  height: 11px;
  fill: #b8b8b8;
  margin: 0 6px;
`

const Title = styled.div`
  text-transform: uppercase;
  color: #666;
`

const Breadcrumbs = ({ title }) => (
  <StyledDiv>
    <StyledLink to="/">{'All products'}</StyledLink>
    <StyledIcon />
    <Title>{title}</Title>
  </StyledDiv>
)

export default Breadcrumbs
