import Coin from 'shared/coin'
import React from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { CURRENCY_SYMBOLS } from 'utils/shared'
import { Text, TextContainer, Title } from './shared'

const CoinValue = styled(Text)`
  color: #ffb652;
  font-weight: 700;
  margin: 0 6px;
`

const ImpactRewards = ({ impactRewards }) => (
  <Section>
    <Title>{'Impact Rewards'}</Title>
    <>
      {impactRewards.map(impactReward => (
        <TextContainer key={impactReward.id}>
          <Coin />
          <CoinValue>{impactReward.impactPointsInCents / 100}</CoinValue>
          <Text>{`after ${impactReward.targetRevenueInCents / 100 || 0}${
            CURRENCY_SYMBOLS[impactReward.targetRevenueCurrency.toUpperCase()]
          } revenue`}</Text>
        </TextContainer>
      ))}
    </>
  </Section>
)

export default ImpactRewards
