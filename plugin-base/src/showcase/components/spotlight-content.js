import ProductItem from './product-item'
import React from 'react'
import styled from 'styled-components'
import { compose, withProps } from 'recompose'
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
  withProps(({ id, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == id),
  }))
)(({ isLeaving, spotlight, callbacks }) => (
  <Container>
    <H2>{spotlight.translation.selectedBy}</H2>
    <TopSlideAnimation isLeaving={isLeaving} name="content">
      <List>
        {spotlight.productPicks.map(
          (product, index) =>
            !product._destroy && (
              <ProductItem
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
