import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ShippingTo = styled(Typography)`
  margin-right: 8px;
  line-height: 32px;
  display: inline-block;
  vertical-align: middle;
`

const Tag = styled(Typography)`
  color: #0f7173;
  text-transform: uppercase;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
`

const TagsContainer = styled.div`
  margin-top: 12px;
  @media (min-width: 960px) {
    margin-top: 16px;
  }
`

const Description = ({ brand }) => {
  const availableLocations = useMemo(() => brand.availableLocations.split(','), [brand.availableLocations])

  return (
    <Container>
      <div>
        <Typography variant="body2">{brand.description}</Typography>
        <TagsContainer>
          <ShippingTo variant="subtitle1">{'Available in:'}</ShippingTo>
          {availableLocations.map((tag, index) => (
            <span key={tag}>
              <Tag variant="subtitle1">
                {tag}
                {index < availableLocations.length - 1 && ','}
              </Tag>
            </span>
          ))}
        </TagsContainer>
      </div>
    </Container>
  )
}

export default Description
