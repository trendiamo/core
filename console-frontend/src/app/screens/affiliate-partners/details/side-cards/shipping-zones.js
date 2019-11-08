import React, { useMemo } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Text, TextContainer, Title } from './shared'

const AvailableLocations = styled(Text)`
  font-weight: 700;
  margin-left: 4px;
`

const ShippingZones = ({ availableLocations }) => {
  const parsedLocations = useMemo(
    () =>
      availableLocations
        .split(', ')
        .map(location =>
          location.length < 4 ? location.toUpperCase() : `${location.charAt(0).toUpperCase()}${location.slice(1)}`
        )
        .join(', '),
    [availableLocations]
  )

  return (
    <Section>
      <Title>{'Shipping Zones'}</Title>
      <TextContainer>
        <Text>{'Available in: '}</Text>
        <AvailableLocations>{parsedLocations}</AvailableLocations>
      </TextContainer>
    </Section>
  )
}

export default ShippingZones
