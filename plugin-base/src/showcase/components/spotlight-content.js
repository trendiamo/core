import Arrow from 'shared/arrow'
import ProductItem from './product-item'
import React from 'react'
import styled from 'styled-components'
import { animate, TopSlideAnimation } from 'shared/animate'
import { compose, withProps } from 'recompose'
import { List } from 'shared/list'

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
`

const AnimatedBlackArrow = animate(
  styled(Arrow).attrs({
    color: '#000',
    lineColor: '#444',
    width: '150px',
  })`
    opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
    transform: ${({ isEntering, isLeaving }) =>
      isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
    transition: opacity 1s ease, transform 0.6s ease;
  `
)

const SpotlightContent = compose(
  withProps(({ id, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == id),
  }))
)(({ isLeaving, spotlight, callbacks }) => (
  <Container>
    <H2>{spotlight.translation.selectedBy}</H2>
    <AnimatedBlackArrow delay={250 * 2} isLeaving={isLeaving} />
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
