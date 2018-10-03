import Arrow from 'shared/arrow'
import { h } from 'preact'
import { List } from 'shared/list'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import { animate, TopSlideAnimation } from 'shared/animate'

const AnimatedWhiteArrow = animate(styled(Arrow).attrs({
  color: '#fff',
  lineColor: '#aaa',
  width: '150px',
})`
  opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
  transform: ${({ isEntering, isLeaving }) =>
    isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
  transition: opacity 1s ease, transform 0.6s ease;
`)

const ArrowContainer = styled.div`
  bottom: 0;
  position: absolute;
`

const CoverRoot = ({ isLeaving, website }) => (
  <div>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 0}>
      {website.title}
    </TopSlideAnimation>
    <ArrowContainer>
      <AnimatedWhiteArrow isLeaving={isLeaving} timeout={250 * 2} />
    </ArrowContainer>
  </div>
)

const ContentRoot = ({ isLeaving, routeToSpotlight, spotlights }) => (
  <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 1}>
    <List>
      {spotlights.map(spotlight => (
        <SpotlightItem key={spotlight.id} routeToSpotlight={routeToSpotlight} spotlight={spotlight} />
      ))}
    </List>
  </TopSlideAnimation>
)

export { CoverRoot, ContentRoot }
