import React, { useMemo } from 'react'
import styled from 'styled-components'
import Tag from 'shared/tag'
import { Typography } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

const Text = styled(Typography)`
  margin-top: 10px;
`

const TagsContainer = styled.div`
  margin: 12px -2px 0;
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
  margin-top: 10px;
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
  const tags = useMemo(() => {
    let result = []
    if (brand.positiveImpactAreaList) result = result.concat(brand.positiveImpactAreaList)
    if (brand.productCategoryList) result = result.concat(brand.productCategoryList)
    return result.length !== 0 && result
  }, [brand.positiveImpactAreaList, brand.productCategoryList])

  const availableLocations = useMemo(() => {
    if (!brand.availableLocations) return
    const result = brand.availableLocations.split(', ')
    return result.length !== 0 && result
  }, [brand.availableLocations])

  return (
    <Container>
      <Text variant="body2">{brand.description}</Text>
      {tags && tags.length !== 0 && <Tags tags={tags} />}
      {availableLocations && <AvailableLocations locations={availableLocations} />}
    </Container>
  )
}

export default Description
