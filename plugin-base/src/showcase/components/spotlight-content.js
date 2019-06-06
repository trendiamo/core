import ProductItem from './product-item'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { List } from 'shared/list'
import { Title } from 'shared'
import { TopSlideAnimation } from 'shared'

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const SpotlightContent = ({ isLeaving, spotlightId, spotlights, callbacks }) => {
  const spotlight = useMemo(() => spotlights.find(e => e.id == spotlightId), [spotlightId, spotlights])

  // needed in preview case
  if (!spotlight) return null

  return (
    <Container>
      <Title
        dangerouslySetInnerHTML={{
          __html: spotlight.translation.selectedBy,
        }}
      />
      <TopSlideAnimation isLeaving={isLeaving} name="content">
        <List objectForResetCheck={spotlight}>
          {spotlight.productPicks.map((product, index) => (
            <ProductItem
              highlight
              key={product.id || `new-${index}`}
              onProductClick={callbacks.onProductClick}
              product={product}
              spotlight={spotlight}
            />
          ))}
        </List>
      </TopSlideAnimation>
    </Container>
  )
}

export default SpotlightContent
