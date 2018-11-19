import Arrow from 'shared/arrow'
import Cover from 'app/content/cover'
import history from 'ext/history'
import routes from 'app/routes'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import transition from 'ext/transition'
import { animate, TopSlideAnimation } from 'shared/animate'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { ContentSpotlight, CoverSpotlight } from './spotlight'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { List } from 'shared/list'
import { Router } from 'ext/simple-router'

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

const CoverCuration = ({ isLeaving, subtitle, title }) => (
  <div>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 0}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TopSlideAnimation>
    <ArrowContainer>
      <AnimatedWhiteArrow isLeaving={isLeaving} timeout={250 * 2} />
    </ArrowContainer>
  </div>
)

const Container = styled.div`
  flex: 1;
  padding: 1rem;
`

const ContentCuration = ({ isLeaving, routeToSpotlight, spotlights }) => (
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

const GhostLayer = styled.div`
  visibility: ${({ isTransitioning }) => (isTransitioning ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const FlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Curation = compose(
  graphql(
    gql`
      query($id: ID!) {
        curation(where: { id: $id }) {
          id
          title
          subtitle
          spotlights {
            id
            text
            persona {
              name
              description
              profilePic {
                url
              }
            }
            productPicks {
              url
              name
              description
              displayPrice
              picture {
                url
              }
            }
          }
        }
      }
    `,
    ({ id }) => ({ id })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    curation: data.curation,
    spotlights: data.curation && data.curation.spotlights,
    subtitle: data.curation && data.curation.subtitle,
    title: data.curation && data.curation.title,
  })),
  withHandlers({
    routeToCuration: ({ curation }) => () => history.replace(routes.curation(curation.id)),
    routeToSpotlight: ({ curation }) => spotlight => history.replace(routes.spotlight(curation.id, spotlight.id)),
  })
)(({ onRouteChange, routeToCuration, routeToSpotlight, isTransitioning, spotlights, subtitle, title }) => (
  <FlexDiv>
    <Cover>
      <Router history={history} onChange={onRouteChange}>
        <CoverCuration path="/curation/:id" subtitle={subtitle} title={title} />
        <CoverSpotlight path="/curation/:id/spotlight/:id" routeToCuration={routeToCuration} spotlights={spotlights} />
      </Router>
    </Cover>
    <Router history={history} onChange={onRouteChange}>
      <ContentCuration path="/curation/:id" routeToSpotlight={routeToSpotlight} spotlights={spotlights} />
      <ContentSpotlight path="/curation/:id/spotlight/:id" spotlights={spotlights} />
    </Router>
    <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
  </FlexDiv>
))

export default Curation
