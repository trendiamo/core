import React from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { Text, TextContainer, Title } from './shared'

const CommissionRate = styled(Text)`
  color: #0f7173;
  font-weight: 700;
  margin-right: 4px;
`

const Compensation = ({ brand }) => (
  <Section>
    <Title>{'Compensation'}</Title>
    <TextContainer>
      <CommissionRate>
        {Number(brand.commissionRate).toLocaleString(undefined, { style: 'percent' })}
        {' Commission'}
      </CommissionRate>
      <Text>{brand.commissionDescription}</Text>
    </TextContainer>
  </Section>
)

export default Compensation
