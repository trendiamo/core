import { Button } from './buttons'
import IconBreadcrumb from 'icons/breadcrumb'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: -16px;
  font-size: 12px;
`

const StyledLink = styled(Link)`
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

const Breadcrumbs = ({ goBack, items }) => (
  <StyledDiv>
    <Button onClick={goBack} outline small>
      {'Back'}
    </Button>

    {items.map(
      item =>
        item.path ? (
          <React.Fragment key={item.path}>
            <StyledLink to={item.path}>{item.text}</StyledLink>
            <StyledIcon />
          </React.Fragment>
        ) : (
          <Title key={item.text}>{item.text}</Title>
        )
    )}
  </StyledDiv>
)

export default Breadcrumbs
