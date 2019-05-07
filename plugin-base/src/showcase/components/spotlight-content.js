import emojify from 'ext/emojify'
import ProductItem from './product-item'
import React from 'react'
import styled from 'styled-components'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { List } from 'shared/list'
import { Title } from 'shared'
import { TopSlideAnimation } from 'shared/animate'

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const SpotlightContent = compose(
  // branch is useful for showcase preview
  withProps(({ spotlightId, spotlights }) => ({
    spotlight: spotlights.find(e => e.id == spotlightId),
  })),
  branch(({ spotlight }) => !spotlight, renderNothing)
)(({ isLeaving, spotlight, callbacks }) => (
  <Container>
    <Title dangerouslySetInnerHTML={{ __html: emojify(spotlight.translation.selectedBy) }} />
    <TopSlideAnimation isLeaving={isLeaving} name="content">
      <List objectForResetCheck={spotlight}>
        {spotlight.productPicks.map((product, index) => (
          <ProductItem
            highlight
            key={product.id || `new-${index}`}
            onClick={callbacks.onProductClick}
            product={product}
            spotlight={spotlight}
          />
        ))}
      </List>
    </TopSlideAnimation>
  </Container>
))

export default SpotlightContent
