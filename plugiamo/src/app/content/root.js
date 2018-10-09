import Arrow from 'shared/arrow'
import { h } from 'preact'
import { List } from 'shared/list'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import { animate, TopSlideAnimation } from 'shared/animate'

const AnimatedWhiteArrow = animate(styled(Arrow).attrs({
  color: '#fff',
  lineColor: '#aaa',
  width: '100px',
})`
  opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
  transform: ${({ isEntering, isLeaving }) =>
    isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
  transition: opacity 1s ease, transform 0.6s ease;
`)

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 135px;
`

const Title = styled.div`
  font-size: 22px;
  line-height: 1.4;
`

const SubTitle = styled.div`
  font-size: 14px;
`

const CoverRoot = ({ isLeaving, website }) => (
  <div>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 0}>
      <Title>{website.title}</Title>
      <SubTitle>{website.subtitle}</SubTitle>
    </TopSlideAnimation>
    <ArrowContainer>
      <AnimatedWhiteArrow isLeaving={isLeaving} timeout={250 * 2} />
    </ArrowContainer>
  </div>
)

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const ContentRoot = ({ isLeaving, routeToSpotlight, spotlights }) => (
  <Container>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 1}>
      <List>
        {spotlights.map(spotlight => (
          <SpotlightItem key={spotlight.id} routeToSpotlight={routeToSpotlight} spotlight={spotlight} />
        ))}
      </List>
    </TopSlideAnimation>
  </Container>
)

export { CoverRoot, ContentRoot }
