import ProductItem from './product-item'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { List } from 'shared/list'
import { TopSlideAnimation } from 'shared/animate'

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const SpotlightContent = compose(
  // branch is useful for showcase preview
  withProps(({ spotlightId, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == spotlightId),
  })),
  branch(({ spotlight }) => !spotlight, renderNothing)
)(({ isLeaving, spotlight, callbacks }) => (
  <Container>
    <H2>{spotlight.translation.selectedBy}</H2>
    <TopSlideAnimation isLeaving={isLeaving} name="content">
      <List objectForResetCheck={spotlight}>
        {spotlight.productPicks.map(
          (product, index) =>
            !product._destroy && (
              <ProductItem
                highlight
                key={product.url || index}
                onClick={callbacks.onProductClick}
                product={product}
                spotlight={spotlight}
              />
            )
        )}
      </List>
    </TopSlideAnimation>
  </Container>
))

export default SpotlightContent
