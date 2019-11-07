import React, { useMemo } from 'react'
import styled from 'styled-components'
import Tag from 'shared/tag'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Text = styled(props => <Typography variant="body2" {...props} />)``

const TagsContainer = styled.div`
  margin: 15px 0 10px;
  width: 100%;
`

const Tags = ({ tags }) => (
  <TagsContainer>
    {tags.map(tag => (
      <Tag key={tag} label={tag} />
    ))}
  </TagsContainer>
)

const AvailableLocationsContainer = styled.div`
  font-weight: 700;
  width: 100%;
`

const AvailableLocationText = styled(props => <Typography variant="subtitle1" {...props} />)`
  display: inline-block;
  margin-right: 4px;
  vertical-align: middle;
`

const AvailableLocation = styled(AvailableLocationText)`
  font-weight: 400;
`

const AvailableLocations = ({ locations }) => (
  <AvailableLocationsContainer>
    <AvailableLocationText variant="subtitle1">{'Available in:'}</AvailableLocationText>
    {locations.map((location, index) => (
      <AvailableLocation key={location}>
        {location.length < 4 ? location.toUpperCase() : location.charAt(0).toUpperCase() + location.slice(1)}
        {index < locations.length - 1 && ', '}
      </AvailableLocation>
    ))}
  </AvailableLocationsContainer>
)

const Description = ({ brand }) => {
  const tags = useMemo(() => brand.positiveImpactAreaList.concat(brand.productCategoryList), [
    brand.positiveImpactAreaList,
    brand.productCategoryList,
  ])
  const availableLocations = useMemo(() => brand.availableLocations.split(', '), [brand.availableLocations])

  return (
    <Container>
      <Text>{brand.description}</Text>
      <Tags tags={tags} />
      <AvailableLocations locations={availableLocations} />
    </Container>
  )
}

export default Description
